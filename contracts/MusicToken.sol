// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MusicToken
 * @dev ERC20 Token representing fractional ownership of a song/music asset.
 * Created by the MusicPlatform factory.
 */
contract MusicToken is ERC20, ERC20Permit, Ownable {
    
    // Metadata for the song
    string public artistName;
    string public songTitle;
    
    constructor(
        string memory name, 
        string memory symbol, 
        string memory _artistName,
        string memory _songTitle,
        address initialOwner
    ) 
        ERC20(name, symbol) 
        ERC20Permit(name)
        Ownable(initialOwner)
    {
        artistName = _artistName;
        songTitle = _songTitle;
    }

    /**
     * @dev Mint function meant to be called by the Platform during creation
     * or potentially for future supply expansions if allowed.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
