pragma solidity ^0.4.24;

import "./libraries/Ownable.sol";
import "./libraries/Pausable.sol";
import "./libraries/ReentrancyGuard.sol";
import "./MarketStorage.sol";

/** @title Core */
contract Core is Ownable, MarketStorage, Pausable, ReentrancyGuard {
    
    // role storage
    uint8 shopperRole = 0;
    uint8 storeOwnerRole = 1;
    uint8 adminRole = 2;

    mapping (address => uint8) public role;
    
    modifier isAdminOnly(){ require(role[msg.sender] == adminRole); _; }
    modifier isStoreOwnerOnly(){ require(role[msg.sender] == storeOwnerRole); _;}    
    modifier isShopperOnly(){ require(role[msg.sender] == shopperRole); _;}

    /** @dev Gives an address the admin role
      * @param _adminAddress address of the recipient of the admin role
      * @return success function ran without error   
      */
    function addAdmin(address _adminAddress) 
        public 
        onlyOwner 
        returns (bool success)
    {
        role[_adminAddress] = adminRole;
        return true;
    }

    /** @dev Remove the admin role from an address by giving the user the default role of Shopper
      * @param _adminAddress address of the recipient of the shopper role
      * @return success function ran without error   
      */
    function removeAdmin(address _adminAddress) 
        public 
        onlyOwner 
        returns (bool success)
    {
        role[_adminAddress] = shopperRole;
        return true;
    }

    /** @dev Gives an address the Storeowner role
      * @param _storeOwnerAddress address of the recipient of the storeowner role
      * @return success function ran without error   
      */
    function addStoreOwner(address _storeOwnerAddress) 
        public 
        isAdminOnly 
        returns (bool success)
    {
        role[_storeOwnerAddress] = storeOwnerRole;
        return true;

    }

    /** @dev Remove the storeowner role from an address by giving the user the default role of Shopper
      * @param _storeOwnerAddress address of the recipient of the shopper role
      * @return success function ran without error   
      */
    function removeStoreOwner(address _storeOwnerAddress) 
        public 
        isAdminOnly 
        returns (bool success)
    {
        role[_storeOwnerAddress] = shopperRole;
        return true;

    }

}