pragma solidity ^0.4.24;

import "./Core.sol";

contract Shopper is Core, ReentrancyGuard {
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

