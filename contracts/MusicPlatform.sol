// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {
    SafeERC20
} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {
    ReentrancyGuard
} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {MusicToken} from "./MusicToken.sol";

contract MusicPlatform is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdcToken;

    struct Listing {
        address seller;
        address tokenAddress;
        uint256 amount;
        uint256 pricePerToken; // Price in USDC per 1e18 tokens (1 full token)
        bool active;
    }

    mapping(uint256 => Listing) public listings;

    // Whitelist for official tokens
    mapping(address => bool) public isSupportedToken;
    // Mapping from token address to artist address
    mapping(address => address) public tokenToArtist;

    uint256 public nextListingId;

    address[] public deployedTokens;

    event MusicTokenCreated(
        address indexed tokenAddress,
        address indexed creator,
        string name,
        string symbol
    );
    event TokenListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed tokenAddress,
        uint256 amount,
        uint256 price
    );
    event TokenSold(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 amount,
        uint256 totalPrice
    );
    event ListingCancelled(uint256 indexed listingId);

    constructor(address _usdcToken) Ownable(msg.sender) {
        usdcToken = IERC20(_usdcToken);
    }

    function createMusicToken(
        string memory name,
        string memory symbol,
        uint256 maxSupply,
        address _artist
    ) external nonReentrant onlyOwner returns (address) {
        MusicToken newToken = new MusicToken(
            _artist,
            name,
            symbol,
            maxSupply,
            address(usdcToken)
        );

        deployedTokens.push(address(newToken));
        isSupportedToken[address(newToken)] = true;
        tokenToArtist[address(newToken)] = _artist;

        emit MusicTokenCreated(address(newToken), _artist, name, symbol);
        return address(newToken);
    }

    function listToken(
        address tokenAddress,
        uint256 amount,
        uint256 pricePerToken
    ) external nonReentrant {
        require(isSupportedToken[tokenAddress], "Token not supported");
        require(
            tokenToArtist[tokenAddress] == msg.sender,
            "Only artist can sell"
        );
        require(amount > 0, "Amount must be greater than 0");
        require(pricePerToken > 0, "Price must be greater than 0");

        // Transfer tokens from seller to platform
        IERC20(tokenAddress).safeTransferFrom(
            msg.sender,
            address(this),
            amount
        );

        listings[nextListingId] = Listing({
            seller: msg.sender,
            tokenAddress: tokenAddress,
            amount: amount,
            pricePerToken: pricePerToken,
            active: true
        });

        emit TokenListed(
            nextListingId,
            msg.sender,
            tokenAddress,
            amount,
            pricePerToken
        );
        nextListingId++;
    }

    function buyToken(
        uint256 listingId,
        uint256 usdcAmount
    ) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing is not active");
        require(usdcAmount > 0, "Amount must be greater than 0");

        // Calculate token amount based on USDC input
        // Formula: (usdcAmount * 1e18) / pricePerToken
        // pricePerToken is the cost of 1e18 tokens (1 full token)
        uint256 amountToBuy = (usdcAmount * 1e18) / listing.pricePerToken;

        require(amountToBuy > 0, "USDC amount too small to buy tokens");
        require(
            listing.amount >= amountToBuy,
            "Insufficient tokens in listing"
        );

        // Calculate actual cost to avoid rounding issues (dust)
        uint256 actualUsdcCost = (amountToBuy * listing.pricePerToken) / 1e18;

        require(
            usdcToken.balanceOf(msg.sender) >= actualUsdcCost,
            "Insufficient USDC balance"
        );
        require(
            usdcToken.allowance(msg.sender, address(this)) >= actualUsdcCost,
            "Insufficient USDC allowance"
        );

        // Transfer USDC from Buyer to Seller
        usdcToken.safeTransferFrom(msg.sender, listing.seller, actualUsdcCost);

        // Update listing
        listing.amount -= amountToBuy;
        if (listing.amount == 0) {
            listing.active = false;
        }

        // Transfer Music Tokens to Buyer
        IERC20(listing.tokenAddress).safeTransfer(msg.sender, amountToBuy);

        emit TokenSold(listingId, msg.sender, amountToBuy, actualUsdcCost);
    }

    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing is not active");
        require(listing.seller == msg.sender, "Not the seller");

        listing.active = false;

        // Return remaining tokens to seller
        IERC20(listing.tokenAddress).safeTransfer(msg.sender, listing.amount);

        emit ListingCancelled(listingId);
    }

    // View function to get all active listings
    function getAllListings() external view returns (Listing[] memory) {
        uint256 activeCount = 0;

        // First pass: count active listings
        for (uint256 i = 0; i < nextListingId; i++) {
            if (listings[i].active) {
                activeCount++;
            }
        }

        Listing[] memory activeListings = new Listing[](activeCount);
        uint256 currentIndex = 0;

        // Second pass: populate array
        for (uint256 i = 0; i < nextListingId; i++) {
            if (listings[i].active) {
                activeListings[currentIndex] = listings[i];
                currentIndex++;
            }
        }

        return activeListings;
    }
    function getListing(
        uint256 listingId
    ) external view returns (Listing memory) {
        return listings[listingId];
    }
}
