pragma solidity ^0.4.24;

import "./libraries/SafeMath.sol";

contract MarketStorage {
    //all storefronts
    Storefront[] public storefronts;
    //link to storefrontId by owner address
    mapping (address => uint[]) public ownedStorefronts;
    uint public storefrontCount;

    struct Storefront {
        uint storefrontId;
        address owner;
        uint balance;
        string name;
        bool isActive;
    }

    struct Product {
        uint productId;
        uint storefrontId;
        string name;
        uint price;
        uint quantity;
        ProductStatus status;
    }

    struct Order {
        uint orderId;
        uint productId;
        uint storefrontId;
        string productName;
        uint datetime;
        uint quantity;
        uint price;
    }

    // Product storage

    mapping (uint => Product[]) public products;

    mapping (address => Order[]) public orders;

    enum ProductStatus {
        Cancelled,
        Listed
    }
    
    // events


    event StorefrontCreate(uint storefrontId);
    event StorefrontNameModified(uint storefrontId);
    event StorefrontRemoved(uint storefrontId);
    event StoreBalanceWithdrawn(uint storefrontId, uint amountWithdrawn);
    event ProductAdded(uint storefrontId, uint productId);
    event ProductDeactivated(uint storefrontId, uint productId);
    event ProductPurchased(uint storefrontId, uint productId, uint orderId);

    // modififiers
    modifier ownsStorefront(uint _storefrontId){ require(msg.sender == storefronts[_storefrontId].owner); _;}
    modifier productAvailable (uint _storefrontId, uint _productId, uint _quantity) { 
        require(products[_storefrontId][_productId].quantity >= _quantity); 
        _; 
    }
    modifier paidEnough (uint _storefrontId, uint _productId, uint _quantity) { 
        require(msg.value >= SafeMath.mul(products[_storefrontId][_productId].price, _quantity)); 
        _; 
    }
}