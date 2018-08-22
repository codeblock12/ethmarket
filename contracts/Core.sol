pragma solidity ^0.4.24;

import "./libraries/Ownable.sol";
import "./libraries/Pausable.sol";
import "./libraries/ReentrancyGuard.sol";
import "./MarketStorage.sol";

contract Core is Ownable, MarketStorage, Pausable, ReentrancyGuard {
    
    // role storage
    uint8 shopperRole = 0;
    uint8 storeOwnerRole = 1;
    uint8 adminRole = 2;

    mapping (address => uint8) public role;
    
    modifier isAdminOnly(){ require(role[msg.sender] == adminRole); _; }
    modifier isStoreOwnerOnly(){ require(role[msg.sender] == storeOwnerRole); _;}    
    modifier isShopperOnly(){ require(role[msg.sender] == shopperRole); _;}

    // Owner Actions
    function addAdmin(address _adminAddress) 
        public 
        onlyOwner 
        returns (bool success)
    {
        role[_adminAddress] = adminRole;
        return true;
    }

    function removeAdmin(address _adminAddress) 
        public 
        onlyOwner 
        returns (bool success)
    {
        role[_adminAddress] = shopperRole;
        return true;
    }

    // Admin Actions

    function addStoreOwner(address _storeOwnerAddress) 
        public 
        isAdminOnly 
        returns (bool success)
    {
        role[_storeOwnerAddress] = storeOwnerRole;
        return true;

    }

    function removeStoreOwner(address _storeOwnerAddress) 
        public 
        isAdminOnly 
        returns (bool success)
    {
        role[_storeOwnerAddress] = shopperRole;
        return true;

    }

}