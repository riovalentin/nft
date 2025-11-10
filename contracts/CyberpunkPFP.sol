// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CyberpunkPFP is ERC721URIStorage, Ownable {
    IERC20 public immutable USDC;
    address public treasury;
    uint256 public price = 10_000; // 0.01 USDC (6 decimals)
    uint256 public nextId = 1;

    constructor(address usdc, address _treasury) ERC721("Cyberpunk PFP", "CYBERPFP") {
        require(usdc != address(0) && _treasury != address(0), "zero addr");
        USDC = IERC20(usdc);
        treasury = _treasury;
    }

    function setPrice(uint256 newPrice) external onlyOwner { price = newPrice; }
    function setTreasury(address t) external onlyOwner { require(t != address(0), "zero addr"); treasury = t; }

    function mintWithUSDC(address to, string memory tokenURI_) external {
        require(USDC.transferFrom(msg.sender, treasury, price), "USDC payment failed");
        uint256 id = nextId;
        _safeMint(to, id);
        _setTokenURI(id, tokenURI_);
        unchecked { nextId = id + 1; }
    }
}
