pragma solidity ^0.4.24;

import "./Storefront.sol";

contract Marketplace is Storefront {
    constructor() public {
        role[msg.sender] = adminRole; 
    }
    function() public payable {
        revert();
    }
}

