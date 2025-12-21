// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.5.0
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {
    ERC20Burnable
} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {
    ERC20Permit
} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {
    SafeERC20
} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MusicToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    using SafeERC20 for IERC20;

    // Constants
    uint256 public immutable MAX_SUPPLY;
    uint256 public immutable REVENUE_SHARE_PER_TOKEN;
    IERC20 public immutable usdcToken;

    // Revenue Tracking
    uint256 public accRevenuePerShare;
    uint256 public constant PRECISION = 1e18;
    mapping(address => uint256) public rewardDebt;
    mapping(address => uint256) public claimableRevenue;

    //events
    event RevenueDeposited(
        address indexed sender,
        uint256 amount,
        uint256 timestamp
    );
    event TokenMinted(address indexed to, uint256 amount, uint256 timestamp);
    event RevenueWithdrawn(
        address indexed sender,
        uint256 amount,
        uint256 timestamp
    );
    event RevenueClaimed(
        address indexed user,
        uint256 amount,
        uint256 timestamp
    );

    constructor(
        address creator,
        string memory tokenName,
        string memory tokenSymbol,
        uint256 _maxSupply,
        address _usdcToken
    )
        ERC20(tokenName, tokenSymbol)
        Ownable(creator)
        ERC20Permit(tokenName)
    {
        MAX_SUPPLY = _maxSupply;
        usdcToken = IERC20(_usdcToken);

        // Calculate revenue share per token (1e18 units) with 1e18 precision (100% = 1e18)
        REVENUE_SHARE_PER_TOKEN = (1e18 * 1e18) / _maxSupply;

        _mint(creator, _maxSupply);
        emit TokenMinted(creator, _maxSupply, block.timestamp);
    }

    // Override _update to track revenue entitlement changes
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override {
        // Update state for 'from' (sender)
        if (from != address(0)) {
            uint256 pending = (balanceOf(from) * accRevenuePerShare) /
                PRECISION -
                rewardDebt[from];
            if (pending > 0) {
                claimableRevenue[from] += pending;
            }
        }

        // Update state for 'to' (receiver)
        if (to != address(0)) {
            uint256 pending = (balanceOf(to) * accRevenuePerShare) /
                PRECISION -
                rewardDebt[to];
            if (pending > 0) {
                claimableRevenue[to] += pending;
            }
        }

        super._update(from, to, value);

        // Update rewardDebt with NEW balances
        if (from != address(0)) {
            rewardDebt[from] =
                (balanceOf(from) * accRevenuePerShare) /
                PRECISION;
        }
        if (to != address(0)) {
            rewardDebt[to] = (balanceOf(to) * accRevenuePerShare) / PRECISION;
        }
    }

    function depositRevenue(uint256 ammount) external returns (uint256 result) {
        require(ammount > 0, "Amount must be greater than 0");
        require(totalSupply() > 0, "No tokens minted");

        usdcToken.safeTransferFrom(msg.sender, address(this), ammount);

        // Update global accumulator
        accRevenuePerShare += (ammount * PRECISION) / totalSupply();

        emit RevenueDeposited(msg.sender, ammount, block.timestamp);

        return accRevenuePerShare; // Returning accRevenuePerShare as a relevant metric
    }

    function withdrawRevenue() external {
        uint256 pending = (balanceOf(msg.sender) * accRevenuePerShare) /
            PRECISION -
            rewardDebt[msg.sender];
        uint256 totalToClaim = claimableRevenue[msg.sender] + pending;

        require(totalToClaim > 0, "No revenue to withdraw");

        // Reset debt and claimable
        claimableRevenue[msg.sender] = 0;
        rewardDebt[msg.sender] =
            (balanceOf(msg.sender) * accRevenuePerShare) /
            PRECISION;

        usdcToken.safeTransfer(msg.sender, totalToClaim);
        emit RevenueWithdrawn(msg.sender, totalToClaim, block.timestamp);
    }

    function pendingRevenue(address user) public view returns (uint256) {
        uint256 pending = (balanceOf(user) * accRevenuePerShare) /
            PRECISION -
            rewardDebt[user];
        return claimableRevenue[user] + pending;
    }

    function getTotalRevenuePerShare() public view returns (uint256) {
        return accRevenuePerShare;
    }
}
