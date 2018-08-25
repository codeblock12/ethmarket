pragma solidity ^0.4.24;

import "./Core.sol";

/** @title Storefront */
contract Storefront is Core {

    using SafeMath for uint;

    /** @dev Retrieves the storefront(s) created by an address
      * @param _account address of potential storefront owner
      * @return storefrontIds an array of storefront ids   
      */
    function getOwnedStorefronts(address _account)
        public
        view
        returns (uint[] memory storefrontIds) 
    {
        return ownedStorefronts[_account];
    }

    /** @dev Create a storefront by a storefront owner
      * @param _storeName name of storefront
      * @return success function ran without error   
      */    
    function createStorefront(string _storeName) 
        public 
        isStoreOwnerOnly 
        returns (bool success) 
    {
       storefronts.push(Storefront({
            storefrontId: storefrontCount,
            owner: msg.sender,
            name: _storeName,
            balance: 0,
            isActive: true
       }));
       ownedStorefronts[msg.sender].push(storefrontCount);
       storefrontCount = storefrontCount.add(1);
       emit StorefrontCreate(storefrontCount);
       return true;
    }

    /** @dev Deactivate an active storefront
      * @param _storefrontId id of the storefront
      * @return success function ran without error   
      */    
    function deactivateStorefront(uint _storefrontId) 
        public 
        ownsStorefront(_storefrontId) 
        isActiveStorefront(_storefrontId) 
        returns (bool success) 
    {
        storefronts[_storefrontId].isActive = false;
        emit StorefrontRemoved(_storefrontId);
        return true;
    }

    /** @dev Modify a storefront name
      * @param _storefrontId id of the storefront
      * @param _name new name of the storefront
      * @return success function ran without error   
      */ 
    function modifyStorefrontName(uint _storefrontId, string _name) 
        public 
        ownsStorefront(_storefrontId)
        isActiveStorefront(_storefrontId) 
        returns (bool success) 
    {
        storefronts[_storefrontId].name = _name;
        emit StorefrontNameModified(_storefrontId);
        return true;
    }

    /** @dev Add a new product to a storefront
      * @param _storefrontId id of the storefront
      * @param _name name of the product
      * @param _price price of the product
      * @param _quantity quantity of the product
      * @return success function ran without error   
      */ 
    function addProduct(uint _storefrontId, string _name, uint _price, uint _quantity) 
        public 
        ownsStorefront(_storefrontId)
        isActiveStorefront(_storefrontId)
        returns (bool success) 
    {       
        products[_storefrontId].push(Product({
            productId: products[_storefrontId].length,
            storefrontId: _storefrontId,
            name: _name,
            price: _price,
            quantity: _quantity,
            status: ProductStatus.Listed
        }));
        emit ProductAdded(_storefrontId, products[_storefrontId].length);
        return true;
    }

    /** @dev Retrieves the number of products in a storefront
      * @param _storefrontId id of the storefront
      * @return size the number of products   
      */ 
   function getProductCountByStorefrontId(uint _storefrontId)
        public
        view
        returns (uint size) 
    {
        return products[_storefrontId].length;
    }

    /** @dev Retrieves a product
      * @param _storefrontId id of the storefront
      * @param _productId id of the product
      * @return tuple of a product  
      */ 
   function getProductByProductId(uint _storefrontId, uint _productId)
        public
        view
        returns (uint, uint, string, uint, uint, ProductStatus) 
    {
        Product memory product = products[_storefrontId][_productId];
        return (
            product.productId, 
            product.storefrontId, 
            product.name, 
            product.price, 
            product.quantity, 
            product.status);
    }            

    /** @dev Deactivate a listed product
      * @param _storefrontId id of the storefront
      * @param _productId id of the product
      * @return tuple of a product  
      */ 
    function deactivateProduct(uint _storefrontId, uint _productId) 
        public 
        isListedProduct(_storefrontId, _productId)        
        ownsStorefront(_storefrontId) 
        returns (bool success) 
    {
        products[_storefrontId][_productId].status = ProductStatus.Cancelled;
        emit ProductDeactivated(_storefrontId, _productId);
        return true;        
    }

    /** @dev Withdraw balance from a storefront regardless of isActive status
      * @param _storefrontId id of the storefront
      * @return success function ran without error   
      */ 
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

    /** @dev Retrieves the number of order of a purchaser
      * @param _address address of purchaser
      * @return size number of orders 
      */ 
    function getOrderCountByAddress(address _address)
        public
        view
        returns (uint size) 
    {
        return orders[_address].length;
    }

    /** @dev Retrieves a order
      * @param _address address of purchaser
      * @param _orderId orderId of an order
      * @return tuple of a order
      */ 
    function getOrder(address _address, uint _orderId)
        public
        view
        returns (uint, uint, uint, string, uint, uint, uint) 
    {
        Order memory order = orders[_address][_orderId];
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

    /** @dev Purchase a product(s) from  a storefront
      * @param _storefrontId id of the storefront
      * @param _productId id of the product
      * @param _quantity number of products to be purchased
      * @return success function ran without error   
      */ 
    function buyProduct(uint _storefrontId, uint _productId, uint _quantity) 
        public
        nonReentrant
        whenNotPaused                
        productAvailable(_storefrontId, _productId, _quantity) 
        paidEnough(_storefrontId, _productId, _quantity)
        payable 
        returns (bool success) 
    {      
				Product storage p = products[_storefrontId][_productId];	        
				// Dededuct from seller
        p.quantity = p.quantity.sub(_quantity);
        storefronts[_storefrontId].balance = storefronts[_storefrontId].balance.add(msg.value);
        // Transfer product
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

