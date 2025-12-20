// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.5.0
pragma solidity ^0.8.27;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {
    ERC1155Burnable
} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import {
    ERC1155Supply
} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {
    SafeERC20
} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

error MusicTokenError(string reason);
error MaxSupplyExceeded(string reason, uint256 maxSupply, uint256 amount);

contract MusicToken is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    using SafeERC20 for IERC20;     // SafeERC20 is a library that provides safe transfer functions for ERC20 tokens

    // Immutable variables
    uint256 public immutable maxSupply;
    uint256 public immutable revenueSharePerToken;      // Revenue share per token

    // State variables
    uint256 public totalRevenue;
    address public marketplace;
    IERC20 public immutable usdcToken;

    // Constants
    uint256 public constant FAN_TOKEN_ID = 0;

    // Modifiers
    modifier onlyMarketplace(){
        require(msg.sender == marketplace, "MusicToken: Not marketplace");
        _;
    }

    // Constructor
    constructor(
        address initialOwner,
        uint256 _maxSupply,
        address _usdcToken
    ) ERC1155("") Ownable(initialOwner) {
        maxSupply = _maxSupply;
        revenueSharePerToken = 1e18 / _maxSupply;     // Calculate revenue share per token
        usdcToken = IERC20(_usdcToken);     // Initialize the USDC token
    }

    //
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mintFanToken(
        address recipient,
        bytes memory data
    ) public onlyOwner {
        _mint(recipient, FAN_TOKEN_ID, maxSupply, data);
    }

    function mintLicenseNFT(
        address recipient,
        uint256 id,
        bytes memory data
    ) public onlyOwner {
        if (id == FAN_TOKEN_ID)
            revert MusicTokenError("MusicToken: Cannot mint fan token as NFT");
        if (totalSupply(id) != 0)
            revert MusicTokenError("MusicToken: NFT already minted");

        _mint(recipient, id, 1, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            if (ids[i] != FAN_TOKEN_ID) {
                if (amounts[i] != 1)
                    revert MusicTokenError("MusicToken: NFT amount must be 1");
                if (totalSupply(ids[i]) != 0)
                    revert MusicTokenError("MusicToken: NFT already minted");
            } else {
                if (totalSupply(ids[i]) + amounts[i] > maxSupply)
                    revert MusicTokenError("MusicToken: Max supply exceeded");
            }
        }
        _mintBatch(to, ids, amounts, data);
    }

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }

    function revenueDistribution(address to) public onlyMarketplace {
        if (totalRevenue == 0) revert MusicTokenError("MusicToken: No revenue");
        if (balanceOf(to, FAN_TOKEN_ID) == 0)
            revert MusicTokenError("MusicToken: User has no fan token");

        uint256 userShare = (totalRevenue *
            revenueSharePerToken *
            balanceOf(to, FAN_TOKEN_ID)) / 1e18;

        totalRevenue -= userShare;
        usdcToken.safeTransfer(to, userShare);
    }

    function depositRevenue(uint256 amount) public onlyMarketplace {
        if (amount == 0)
            revert MusicTokenError("MusicToken: Amount must be greater than 0");

        totalRevenue += amount;

        usdcToken.safeTransferFrom(msg.sender, address(this), amount);
        
    }
}
