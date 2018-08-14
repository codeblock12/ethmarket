pragma solidity ^0.4.23;

contract MarketPlace {
    
    address owner;

    // role storage
    uint8 adminRole = 0;
    uint8 storeOwnerRole = 1;
    uint8 shopperRole = 2;

    mapping (address => uint8) public role;

    // store owner storage
    Storefront[] public Storefronts;

    struct Storefront {
        uint storeId;
        address owner;
        uint balance;
        Product[] products;
    }

    struct Product {
        uint productId;
        string name;
        uint price;
        uint quantity;
    }   
    
    // events
    event StorefrontCreate();
    event StorefrontRemoved();
    event StoreBalanceWithdrawn();
    event ProductAdded();
    event ProductModified();
    event ProductRemoved();
    event ProductPurchased();

    // modififiers

    modifier isOwnerOnly(){ require(msg.sender == owner); _; }

    modifier isAdminOnly(){ require(role[msg.sender] == adminRole); _; }
    
    modifier isStoreOwnerOnly(){ require(role[msg.sender] == storeOwnerRole); _;}

    modifier isStorefrontOwner(Storefront storefront){ require(msg.sender == storefront.owner); _;}
    
    modifier isShopperOnly(){ require(role[msg.sender] == shopperRole); _;}

    constructor() public {
        owner = msg.sender;
    }

    // General Actions
    function getRole () public view returns (uint8) {
        return role[msg.sender];
    }
    
    // Owner Actions
    function addAdmin(address adminAddress) public isOwnerOnly returns (bool success){
        role[adminAddress] = adminRole;
        return true;
    }

    function removeAdmin(address adminAddress) public isOwnerOnly returns (bool success){
        role[adminAddress] = shopperRole;
        return true;
    }

    // Admin Actions

    function addStoreOwner(address storeOwnerAddress) public isAdminOnly returns (bool success){
        role[storeOwnerAddress] = storeOwnerRole;
        return true;

    }

    function removeStoreOwner(address storeOwnerAddress) public isAdminOnly returns (bool success){
        role[storeOwnerAddress] = shopperRole;
        return true;

    }

    // Store Owner Actions

    function createStorefront(){}

    function removeStorefront(){}

    function withdrawStoreFunds(){}

    function addProduct(){}

    function modifyProduct(){}

    function removeProduct(){}

    // Shopper Actions

    function buyProduct(){}

}

