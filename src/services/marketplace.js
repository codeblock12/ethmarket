import { default as contract } from 'truffle-contract'
import marketplaceArtifact from '../../build/contracts/Marketplace.json'
import { defaultErrorNotification } from '../utilities'

const web3 = window.web3;

const defaultGasLimit = 50000;
const highGasLimit = 5000000

export default class Marketplace {

  constructor () {
      let self = this;
      self.contract = contract(marketplaceArtifact)
      self.contract.setProvider(web3.currentProvider)
      self.init().then(instance => self.instance = instance)
  }

  init() {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.contract.deployed()
      .then(instance => resolve(instance))
      .catch ( defaultErrorNotification )
    })       
  }

  getOwnerAddress () {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.owner.call()
      .then( address => resolve(address))
      .catch ( defaultErrorNotification )
    }) 
  }  

  getRoleByAddress (_address) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.role.call(_address)
      .then( role => resolve(role))
      .catch ( defaultErrorNotification )
    }) 
  }

  setAdminRoleByAddress (_address, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.addAdmin(
        _address, 
        {from: _caller, gas: defaultGasLimit})
      .then( role => resolve(role))
      .catch ( defaultErrorNotification )
    }) 
  }

  removeAdminRoleByAddress (_address, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.removeAdmin(
        _address,
        {from: _caller, gas: defaultGasLimit})
      .then( role => resolve(role))
      .catch ( defaultErrorNotification )
    }) 
  }

  setStoreOwnerByAddress (_address, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.addStoreOwner(
        _address,
        {from: _caller, gas: defaultGasLimit})
      .then( role => resolve(role))
      .catch ( defaultErrorNotification )
    }) 
  }

  removeStoreOwnerByAddress (_address, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.removeStoreOwner(
        _address, 
        {from: _caller, gas: defaultGasLimit})
      .then( role => resolve(role))
      .catch ( defaultErrorNotification )
    }) 
  }

  createStorefrontByName(_name, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.createStorefront(
        _name, 
        {from: _caller, gas: highGasLimit})
      .then( role => resolve(role))
      .catch ( defaultErrorNotification )
    })     
  }

  getStorefrontsByAddress(_address) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.getOwnedStorefronts.call(_address)
      .then( storefronts => resolve(storefronts))
      .catch ( defaultErrorNotification )
    })     
  }  
  
  getStorefrontsById(_id) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.storefronts.call(_id)
      .then( storefront => resolve(storefront))
      .catch ( defaultErrorNotification )
    })     
  }    

  getStorefrontCount() {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.storefrontCount.call()
      .then( storefrontCount => resolve(storefrontCount))
      .catch ( defaultErrorNotification )
    })     
  }

  deactivateStorefront(_storefrontId, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.deactivateStorefront(
        _storefrontId, 
        {from: _caller, gas: highGasLimit})
      .then( success => resolve(success))
      .catch ( defaultErrorNotification )
    })   
  }

  renameStorefront(_storefrontId, _name, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.modifyStorefrontName(_storefrontId,
         _name,
         {from: _caller, gas: highGasLimit})
      .then( success => resolve(success))
      .catch ( defaultErrorNotification )
    })   
  }

  withdrawStorefrontFunds(_storefrontId, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.withdrawStoreFunds(
        _storefrontId,
        {from: _caller, gas: highGasLimit})
      .then( success => resolve(success))
      .catch ( defaultErrorNotification )
    })   
  }

  createProduct(_storefrontId, _productName, _price, _quantity, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.addProduct(
        _storefrontId, 
        _productName,
        _price,
        _quantity,
        {from: _caller, gas: highGasLimit})
      .then( success => resolve(success))
      .catch ( defaultErrorNotification )
    })   
  }
  getProductCountByStorefrontId(_storefrontId) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.getProductCountByStorefrontId.call(_storefrontId)
      .then( size => resolve(size))
      .catch ( defaultErrorNotification )
    })     
  }

  getProduct(_storefrontId, _productId) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.getProductByProductId.call(_storefrontId, _productId)
      .then( product => resolve(product))
      .catch ( defaultErrorNotification )
    })     
  }

  deactivateProduct(_storefrontId, _productId, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.deactivateProduct(
        _storefrontId, 
        _productId,
        {from: _caller, gas: highGasLimit})
      .then( success => resolve(success))
      .catch ( defaultErrorNotification )
    })   
  }

  buyProduct(_storefrontId, _productId, _quantity, _total, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.buyProduct(
        _storefrontId, 
        _productId,
        _quantity,
        {from: _caller, value: _total, gas: highGasLimit})
      .then( success => resolve(success))
      .catch ( defaultErrorNotification )
    })       
  }

  getOrderCountByAddress(_address) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.getOrderCountByAddress.call(_address)
      .then( size => resolve(size))
      .catch ( defaultErrorNotification )
    })     
  }

  getOrder(_address, _orderId) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.getOrder(_address, _orderId)
      .then( product => resolve(product))
      .catch ( defaultErrorNotification )
    })     
  }

}