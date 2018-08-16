pragma solidity ^0.4.23;

contract MarketPlace {
    
    address owner;

    // role storage
    uint8 adminRole = 0;
    uint8 storeOwnerRole = 1;
    uint8 shopperRole = 2;

    mapping (address => uint8) public role;

    // store owner storage
    Storefront[] public storefronts;
    uint storefrontCount;

    struct Storefront {
        uint id; //also used as index in storefronts array
        address owner;
        uint balance;
        string name;
        bool isActive;
        Product[] products;
    }

    struct Product {
        uint productId;
        uint storefrontId;
        string name;
        uint price;
        uint quantity;
        ProductStatus status;
    }

    // Product storage

    mapping (address => Product[]) public shopper;

    enum ProductStatus {
        Cancelled,
        Sold,
        Listed
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

    modifier ownsStorefront(uint _storefrontId){ require(msg.sender == storefronts[_storefrontId].owner); _;}
    
    modifier isShopperOnly(){ require(role[msg.sender] == shopperRole); _;}

    modifier productAvailable (uint _storefrontId, uint _productId, uint _quantity) { require(storefronts[_storefrontId].products[_productId].quantity > _quantity); _; }

    modifier paidEnough (uint _storefrontId, uint _productId, uint _quantity) { require(msg.value > storefronts[_storefrontId].products[_productId].price * _quantity); _; }

    constructor() public {
        owner = msg.sender;
        storefrontCount = 0;
    }

    // fallback

    function() public payable {
        revert();
    }

    // General Actions
    function getRole () public view returns (uint8) {
        return role[msg.sender];
    }
    
    // Owner Actions
    function addAdmin(address _adminAddress) public isOwnerOnly returns (bool success){
        role[_adminAddress] = adminRole;
        return true;
    }

    function removeAdmin(address _adminAddress) public isOwnerOnly returns (bool success){
        role[_adminAddress] = shopperRole;
        return true;
    }

    // Admin Actions

    function addStoreOwner(address _storeOwnerAddress) public isAdminOnly returns (bool success){
        role[_storeOwnerAddress] = storeOwnerRole;
        return true;

    }

    function removeStoreOwner(address _storeOwnerAddress) public isAdminOnly returns (bool success){
        role[_storeOwnerAddress] = shopperRole;
        return true;

    }

    // Store Owner Actions

    function createStorefront(string storeName) isStoreOwnerOnly returns (bool success) {
       storefronts.push(Storefront({
            id: storefrontCount,
            owner: msg.sender,
            name: storeName,
            balance: 0,
            isActive: true,
            products: new Product[](0)
       }));

       storefrontCount += 1;
       return true;
    }

    function deactivateStorefront(uint _storefrontId) ownsStorefront(_storefrontId) returns (bool success) {
        storefronts[_storefrontId].isActive = false;
        return true;
    }

    function modifyStorefrontName(uint _storefrontId, string _name) ownsStorefront(_storefrontId) returns (bool success) {
        storefronts[_storefrontId].name = _name;
        return true;
    }

    function addProduct(uint _storefrontId, string _name, uint _price, uint _quantity) ownsStorefront(_storefrontId) returns (bool success) {
        Product memory newProduct = Product({
            storefrontId: _storefrontId,
            productId: storefronts[_storefrontId].products.length,
            name: _name,
            price: _price,
            quantity: _quantity,
            status: ProductStatus.Listed
        });
        
        storefronts[_storefrontId].products.push(newProduct);
        return true;
    }

    function deactivateProduct(uint _storefrontId, uint _productId) ownsStorefront(_storefrontId) returns (bool success) {
        storefronts[_storefrontId].products[_productId].status = ProductStatus.Cancelled;
        return true;        
    }

    function withdrawStoreFunds(uint _storefrontId) ownsStorefront(_storefrontId) returns (bool success) {
        Storefront storage store = storefronts[_storefrontId];
        uint previousBalance = store.balance;
        store.balance = 0;
        if(!storefronts[_storefrontId].owner.send(store.balance)) {
            store.balance = previousBalance;
        }
        
        return true;        
    }

    // Shopper Actions

    function buyProduct(uint _storefrontId, uint _productId, uint _quantity) 
        productAvailable(_storefrontId, _productId, _quantity) 
        paidEnough(_storefrontId, _productId, _quantity)
        public 
        payable 
        returns (bool success) 
    {      
        // Dededuct from seller
        storefronts[_storefrontId].products[_productId].quantity -= _quantity;
        storefronts[_storefrontId].balance += msg.value;

        // Transfer product
        Product memory p = storefronts[_storefrontId].products[_productId];
        p.quantity = _quantity;
        p.status = ProductStatus.Sold;

        shopper[msg.sender].push(p);

        return true;
    }

}

