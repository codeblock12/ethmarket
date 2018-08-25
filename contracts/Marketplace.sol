pragma solidity ^0.4.24;

import "./Storefront.sol";

/** @title Marketplace */
contract Marketplace is Storefront {
    //initiates the owner with an admin role.
    constructor() public {
        role[msg.sender] = adminRole; 
    }
    function() public payable {
        revert();
    }
}

