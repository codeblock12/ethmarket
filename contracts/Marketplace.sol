pragma solidity ^0.4.24;

import "./libraries/Pausable.sol";
import "./Storefront.sol";
import "./Shopper.sol";


contract Marketplace is Pausable, Storefront, Shopper {
    constructor() public {
        storefrontCount = 0;
        role[msg.sender] = adminRole; 
    }
    // fallback
    function() public payable {
        revert();
    }
}

