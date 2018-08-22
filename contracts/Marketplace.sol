pragma solidity ^0.4.24;

import "./Storefront.sol";
import "./Shopper.sol";


contract Marketplace is Storefront, Shopper {
    constructor() public {
        role[msg.sender] = adminRole; 
    }
    function() public payable {
        revert();
    }
}

