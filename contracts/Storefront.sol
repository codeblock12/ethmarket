pragma solidity ^0.4.24;

import "./Core.sol";

contract Storefront is Core {
    function getOwnedStorefronts(address account)
        public
        view
        returns (uint[] memory) 
    {
        return ownedStorefronts[account];
    }

    function createStorefront(string storeName) 
        public 
        isStoreOwnerOnly 
        returns (bool success) 
    {
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

    function deactivateStorefront(uint _storefrontId) 
        public ownsStorefront(_storefrontId) 
        returns (bool success) 
    {
        storefronts[_storefrontId].isActive = false;
        emit StorefrontRemoved(_storefrontId);
        return true;
    }

    function modifyStorefrontName(uint _storefrontId, string _name) 
        public 
        ownsStorefront(_storefrontId) 
        returns (bool success) 
    {
        storefronts[_storefrontId].name = _name;
        emit StorefrontNameModified(_storefrontId);
        return true;
    }

    function addProduct(uint _storefrontId, string _name, uint _price, uint _quantity) 
        public 
        ownsStorefront(_storefrontId) 
        returns (bool success) 
    {       
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

    function deactivateProduct(uint _storefrontId, uint _productId) 
        public 
        ownsStorefront(_storefrontId) 
        returns (bool success) 
    {
        products[_storefrontId][_productId].status = ProductStatus.Cancelled;
        emit ProductDeactivated(_storefrontId, _productId);
        return true;        
    }

    function withdrawStoreFunds(uint _storefrontId) 
        public 
        whenNotPaused
        nonReentrant                
        ownsStorefront(_storefrontId) 
        returns (bool success) 
    {
        Storefront storage store = storefronts[_storefrontId];
        if(storefronts[_storefrontId].owner.send(store.balance)) {
            store.balance = 0;
        } else {
            revert();
        }
        emit StoreBalanceWithdrawn(_storefrontId, store.balance);   
        return true;        
    }

    function getOrderCountByAddress(address _address)
        public
        view
        returns (uint size) 
    {
        return orders[_address].length;
    }

    function getOrder(address _address, uint orderId)
        public
        view
        returns (uint, uint, uint, string, uint, uint, uint) 
    {
        Order memory order = orders[_address][orderId];
        return (
            order.orderId,
            order.productId,
            order.storefrontId,
            order.productName, 
            order.datetime, 
            order.quantity, 
            order.price
        );
    }

    function buyProduct(uint _storefrontId, uint _productId, uint _quantity) 
        public
        nonReentrant
        whenNotPaused                
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
            productName: p.name,
            datetime: now,
            quantity: _quantity,
            price: p.price
        }));
        emit ProductPurchased(_storefrontId, _productId, orders[msg.sender].length);
        return true;
    }        
}

