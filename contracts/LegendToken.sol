// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LegendToken is ERC20{
    uint256 constant _total_supply = 220000000000*(10**18);

    constructor() ERC20("Legend", "LGD") {
       _mint(msg.sender, _total_supply); 


    }
}


