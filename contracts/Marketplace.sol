pragma solidity ^0.4.23;

contract Marketplace {
    
    address public owner;

    // role storage
    uint8 shopperRole = 0;
    uint8 storeOwnerRole = 1;
    uint8 adminRole = 2;

    mapping (address => uint8) public role;

    // store owner storage

    //all storefronts
    Storefront[] public storefronts;
    //link to storefrontId by owner address
    mapping (address => uint[]) public ownedStorefronts;
    uint public storefrontCount;

    struct Storefront {
        uint storefrontId; //also used as index in storefronts array
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

    modifier isOwnerOnly(){ require(msg.sender == owner); _; }

    modifier isAdminOnly(){ require(role[msg.sender] == adminRole); _; }
    
    modifier isStoreOwnerOnly(){ require(role[msg.sender] == storeOwnerRole); _;}

    modifier ownsStorefront(uint _storefrontId){ require(msg.sender == storefronts[_storefrontId].owner); _;}
    
    modifier isShopperOnly(){ require(role[msg.sender] == shopperRole); _;}

    modifier productAvailable (uint _storefrontId, uint _productId, uint _quantity) { require(products[_storefrontId][_productId].quantity > _quantity); _; }

    modifier paidEnough (uint _storefrontId, uint _productId, uint _quantity) { require(msg.value >= products[_storefrontId][_productId].price * _quantity); _; }

    constructor() public {
        owner = msg.sender;
        storefrontCount = 0;
        role[msg.sender] = adminRole; 
    }

    // fallback

    function() public payable {
        revert();
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

    // Storefront

    function getOwnedStorefronts(address account)
        public
        view
        returns (uint[] memory) 
    {
        return ownedStorefronts[account];
    }

    function createStorefront(string storeName) public isStoreOwnerOnly returns (bool success) {
       
       storefronts.push(Storefront({
            storefrontId: storefrontCount,
            owner: msg.sender,
            name: storeName,
            balance: 0,
            isActive: true
       }));

       ownedStorefronts[msg.sender].push(storefrontCount);

       storefrontCount += 1;
       emit StorefrontCreate(storefrontCount);
       return true;
    }

    function deactivateStorefront(uint _storefrontId) public ownsStorefront(_storefrontId) returns (bool success) {
        storefronts[_storefrontId].isActive = false;
        emit StorefrontRemoved(_storefrontId);
        return true;
    }

    function modifyStorefrontName(uint _storefrontId, string _name) public ownsStorefront(_storefrontId) returns (bool success) {
        storefronts[_storefrontId].name = _name;
        emit StorefrontNameModified(_storefrontId);
        return true;
    }

    function addProduct(uint _storefrontId, string _name, uint _price, uint _quantity) public ownsStorefront(_storefrontId) returns (bool success) {       
        products[_storefrontId].push(Product({
            storefrontId: _storefrontId,
            productId: products[_storefrontId].length,
            name: _name,
            price: _price,
            quantity: _quantity,
            status: ProductStatus.Listed
        }));
        emit ProductAdded(_storefrontId, products[_storefrontId].length);
        return true;
    }

   function getProductCountByStorefrontId(uint _storefrontId)
        public
        view
        returns (uint size) 
    {
        return products[_storefrontId].length;
    }

   function getProductsByProductId(uint _storefrontId, uint _productId)
        public
        view
        returns (uint, uint, string, uint, uint, ProductStatus) 
    {
        Product memory product = products[_storefrontId][_productId];
        return (
            product.storefrontId, 
            product.productId, 
            product.name, 
            product.price, 
            product.quantity, 
            product.status);
    }            

    function deactivateProduct(uint _storefrontId, uint _productId) public ownsStorefront(_storefrontId) returns (bool success) {
        products[_storefrontId][_productId].status = ProductStatus.Cancelled;
        emit ProductDeactivated(_storefrontId, _productId);
        return true;        
    }

    function withdrawStoreFunds(uint _storefrontId) public ownsStorefront(_storefrontId) returns (bool success) {
        if(!storefronts[_storefrontId].owner.send(storefronts[_storefrontId].balance)) {
            revert();
        }
        emit StoreBalanceWithdrawn(_storefrontId, storefronts[_storefrontId].balance);   
        return true;        
    }

    // Shopper Actions

    function buyProduct(uint _storefrontId, uint _productId, uint _quantity) 
        public
        productAvailable(_storefrontId, _productId, _quantity) 
        paidEnough(_storefrontId, _productId, _quantity) 
        payable 
        returns (bool success) 
    {      
        // Dededuct from seller
        products[_storefrontId][_productId].quantity -= _quantity;
        storefronts[_storefrontId].balance += msg.value;

        // Transfer product
        Product memory p = products[_storefrontId][_productId];
        
        orders[msg.sender].push(Order({
            orderId: orders[msg.sender].length,
            productId: p.productId,
            storefrontId: p.storefrontId,
            datetime: now,
            quantity: _quantity,
            price: p.price
        }));

        emit ProductPurchased(_storefrontId, _productId, orders[msg.sender].length);

        return true;
    }
}

