pragma solidity ^0.4.24;

import "./libraries/SafeMath.sol";

/** @title Market Storage */
contract MarketStorage {
    using SafeMath for uint;
    // All storefronts. The element index of each storefront is also the storefrontId.
    Storefront[] public storefronts;

    //maps storefrontId by owner address
    mapping (address => uint[]) public ownedStorefronts;

    //used as a counter to increment storefrontId
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

    // Post purchase of a product, an order is generated as a reciept for the purchaser
    struct Order {
        uint orderId;
        uint productId;
        uint storefrontId;
        string productName;
        uint datetime;
        uint quantity;
        uint price;
    }

    /*
     Product storage. The uint is the storefrontId 
     Index is used as the productId
    */
    mapping (uint => Product[]) public products;
    
    // Order storage. The address is the purchaser of the purchased productIndex is used as the orderId.
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

    // storefront modifiers
    modifier ownsStorefront(uint _storefrontId){ require(msg.sender == storefronts[_storefrontId].owner); _;}
    modifier productAvailable (uint _storefrontId, uint _productId, uint _quantity) { 
        Product memory p = products[_storefrontId][_productId];
        require(p.quantity >= _quantity && p.status == ProductStatus.Listed); 
        _; 
    }
    modifier isActiveStorefront(uint _storefrontId) { require(storefronts[_storefrontId].isActive == true); _;}

    modifier paidEnough (uint _storefrontId, uint _productId, uint _quantity) { 
        require(msg.value >= products[_storefrontId][_productId].price.mul(_quantity)); 
        _; 
    }
    modifier isListedProduct(uint _storefrontId, uint _productId){ 
        require(products[_storefrontId][_productId].status == ProductStatus.Listed); 
        _;
    }
}