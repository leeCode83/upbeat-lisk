// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./MusicToken.sol";

/**
 * @title MusicPlatform
 * @dev Factory and Marketplace for MusicTokens.
 * Handles:
 * 1. Creating new MusicTokens (Tokenization)
 * 2. Primary Sales (ICO) with automatic distribution to artists
 * 3. Secondary Market (Peer-to-Peer trading)
 */
contract MusicPlatform is ReentrancyGuard, Ownable {
    struct SongListing {
        address tokenAddress;
        address artist; // The creator who receives primary sale funds
        uint256 pricePerToken; // In Wei
        uint256 tokensAvailableForPrimarySale;
        bool isActive;
    }

    struct SecondaryListing {
        address seller;
        address tokenAddress; // The MusicToken address
        uint256 amount;
        uint256 priceTotal; // Total price for the amount of tokens
        bool isActive;
    }

    // Mapping from Token Address -> Primary Market Details
    mapping(address => SongListing) public primaryMarket;

    // Array of all deployed tokens
    address[] public allSongs;

    // Secondary Market Listings: Listing ID -> Listing Details
    mapping(uint256 => SecondaryListing) public secondaryListings;
    uint256 public nextListingId;

    // Events
    event SongCreated(
        address indexed tokenAddress,
        string title,
        string artist,
        address indexed creator
    );
    event TokensPurchasedPrimary(
        address indexed tokenAddress,
        address indexed buyer,
        uint256 amount,
        uint256 cost
    );
    event ListingCreated(
        uint256 indexed listingId,
        address indexed seller,
        address indexed tokenAddress,
        uint256 amount,
        uint256 price
    );
    event ListingPurchased(
        uint256 indexed listingId,
        address indexed buyer,
        address indexed tokenAddress,
        uint256 amount,
        uint256 price
    );
    event ListingCancelled(uint256 indexed listingId);

    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @dev Create a new MusicToken (Tokenize a song).
     * @param _symbol Token symbol (e.g. "SONG1")
     * @param _title Song Title
     * @param _artistName Artist Name
     * @param _totalSupply Total number of tokens to mint
     * @param _percentageForSale Percentage (0-100) to be sold in primary market
     * @param _pricePerToken Price per token in Wei for primary market
     */
    function createSongToken(
        string memory _symbol,
        string memory _title,
        string memory _artistName,
        uint256 _totalSupply,
        uint256 _percentageForSale,
        uint256 _pricePerToken
    ) external nonReentrant returns (address) {
        require(_percentageForSale <= 100, "Percentage > 100");
        require(_totalSupply > 0, "Total supply is 0");

        // Deploy new MusicToken
        // Note: The Platform (this contract) becomes the owner initially to mint
        MusicToken newToken = new MusicToken(
            _title,
            _symbol,
            _artistName,
            _title,
            address(this)
        );

        // Calculate distribution
        uint256 amountForSale = (_totalSupply * _percentageForSale) / 100;
        uint256 amountForArtist = _totalSupply - amountForSale;

        // Mint Artist's share directly to them
        if (amountForArtist > 0) {
            newToken.mint(msg.sender, amountForArtist);
        }

        // Mint Sale share to this contract (Platform)
        if (amountForSale > 0) {
            newToken.mint(address(this), amountForSale);
        }

        // Store Primary Market details
        primaryMarket[address(newToken)] = SongListing({
            tokenAddress: address(newToken),
            artist: msg.sender,
            pricePerToken: _pricePerToken,
            tokensAvailableForPrimarySale: amountForSale,
            isActive: true
        });

        allSongs.push(address(newToken));

        emit SongCreated(address(newToken), _title, _artistName, msg.sender);

        // Transfer ownership of the token contract to the artist (optional, but gives them control)
        // Or keep it with platform if platform needs to mint more later.
        // For now, let's transfer it to the artist so they own their contract.
        newToken.transferOwnership(msg.sender);

        return address(newToken);
    }

    /**
     * @dev Buy tokens from the Primary Market (ICO).
     * Funds are automatically distributed to the Artist.
     * @param _tokenAddress The address of the MusicToken to buy
     * @param _amount The amount of tokens to buy
     */
    function buyTokensPrimary(
        address _tokenAddress,
        uint256 _amount
    ) external payable nonReentrant {
        SongListing storage listing = primaryMarket[_tokenAddress];
        require(listing.isActive, "Sale not active");
        require(
            listing.tokensAvailableForPrimarySale >= _amount,
            "Not enough tokens for sale"
        );

        uint256 cost = listing.pricePerToken * _amount;
        require(msg.value >= cost, "Insufficient funds sent");

        // Update state
        listing.tokensAvailableForPrimarySale -= _amount;

        // Automatic Distribution: Transfer ETH to Artist
        (bool success, ) = payable(listing.artist).call{value: cost}("");
        require(success, "Transfer to artist failed");

        // Transfer Tokens to Buyer
        IERC20(_tokenAddress).transfer(msg.sender, _amount);

        // Refund excess ETH
        if (msg.value > cost) {
            (bool refundSuccess, ) = payable(msg.sender).call{
                value: msg.value - cost
            }("");
            require(refundSuccess, "Refund failed");
        }

        emit TokensPurchasedPrimary(_tokenAddress, msg.sender, _amount, cost);
    }

    // ==========================================
    // Secondary Market (Peer-to-Peer)
    // ==========================================

    /**
     * @dev List tokens for sale on the secondary market.
     * User must approve this contract to spend their tokens first.
     */
    function createSecondaryListing(
        address _tokenAddress,
        uint256 _amount,
        uint256 _priceTotal
    ) external nonReentrant {
        require(_amount > 0, "Amount must be > 0");
        IERC20 token = IERC20(_tokenAddress);

        // Transfer tokens from seller to platform escrow
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );

        secondaryListings[nextListingId] = SecondaryListing({
            seller: msg.sender,
            tokenAddress: _tokenAddress,
            amount: _amount,
            priceTotal: _priceTotal,
            isActive: true
        });

        emit ListingCreated(
            nextListingId,
            msg.sender,
            _tokenAddress,
            _amount,
            _priceTotal
        );
        nextListingId++;
    }

    /**
     * @dev Purchase a secondary market listing.
     * Funds go to the seller.
     */
    function buySecondaryListing(
        uint256 _listingId
    ) external payable nonReentrant {
        SecondaryListing storage listing = secondaryListings[_listingId];
        require(listing.isActive, "Listing not active");
        require(msg.value >= listing.priceTotal, "Insufficient funds");

        // Update state first
        listing.isActive = false;

        // Transfer funds to Seller (AUTOMATIC DISTRIBUTION for secondary sales)
        // Note: A platform fee could be taken here
        (bool success, ) = payable(listing.seller).call{
            value: listing.priceTotal
        }("");
        require(success, "Transfer to seller failed");

        // Transfer tokens to Buyer
        IERC20(listing.tokenAddress).transfer(msg.sender, listing.amount);

        // Refund excess
        if (msg.value > listing.priceTotal) {
            payable(msg.sender).transfer(msg.value - listing.priceTotal);
        }

        emit ListingPurchased(
            _listingId,
            msg.sender,
            listing.tokenAddress,
            listing.amount,
            listing.priceTotal
        );
    }

    function cancelSecondaryListing(uint256 _listingId) external nonReentrant {
        SecondaryListing storage listing = secondaryListings[_listingId];
        require(listing.isActive, "Listing not active");
        require(listing.seller == msg.sender, "Not seller");

        listing.isActive = false;

        // Return tokens to seller
        IERC20(listing.tokenAddress).transfer(listing.seller, listing.amount);

        emit ListingCancelled(_listingId);
    }

    // View function to get all songs
    function getAllSongs() external view returns (address[] memory) {
        return allSongs;
    }
}
