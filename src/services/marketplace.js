import { default as contract } from 'truffle-contract'
import marketplaceArtifact from '../../build/contracts/Marketplace.json'

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
      .catch ( err => reject(err))
    })       
  }

  getRoleByAddress (_address) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.role.call(_address)
      .then( role => resolve(role))
      .catch ( err => reject(err))
    }) 
  }

  setAdminRoleByAddress (_address, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.addAdmin(
        _address, 
        {from: _caller, gas: defaultGasLimit})
      .then( role => resolve(role))
      .catch ( err => reject(err))
    }) 
  }

  removeAdminRoleByAddress (_address, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.removeAdmin(
        _address,
        {from: _caller, gas: defaultGasLimit})
      .then( role => resolve(role))
      .catch ( err => reject(err))
    }) 
  }

  setStoreOwnerByAddress (_address, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.addStoreOwner(
        _address,
        {from: _caller, gas: defaultGasLimit})
      .then( role => resolve(role))
      .catch ( err => reject(err))
    }) 
  }

  removeStoreOwnerByAddress (_address, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.removeStoreOwner(
        _address, 
        {from: _caller, gas: defaultGasLimit})
      .then( role => resolve(role))
      .catch ( err => reject(err))
    }) 
  }

  createStorefrontByName(_name, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.createStorefront(
        _name, 
        {from: _caller, gas: highGasLimit})
      .then( role => resolve(role))
      .catch ( err => reject(err))
    })     
  }

  getStorefrontsByAddress(_address) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.getOwnedStorefronts.call(_address)
      .then( storefronts => resolve(storefronts))
      .catch ( err => reject(err))
    })     
  }  
  
  getStorefrontsById(_id) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.storefronts.call(_id)
      .then( storefront => resolve(storefront))
      .catch ( err => reject(err))
    })     
  }    

  getStorefrontCount() {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.storefronts.call()
      .then( storefrontCount => resolve(storefrontCount))
      .catch ( err => reject(err))
    })     
  }

  deactivateStorefront(_storefrontId, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.deactivateStorefront(
        _storefrontId, 
        {from: _caller, gas: highGasLimit})
      .then( success => resolve(success))
      .catch ( err => reject(err))
    })   
  }

  renameStorefront(_storefrontId, _name, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.modifyStorefrontName(_storefrontId,
         _name,
         {from: _caller, gas: highGasLimit})
      .then( success => resolve(success))
      .catch ( err => reject(err))
    })   
  }

  withdrawStorefrontFunds(_storefrontId, _caller) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.withdrawStoreFunds(
        _storefrontId,
        {from: _caller, gas: highGasLimit})
      .then( success => resolve(success))
      .catch ( err => reject(err))
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
      .catch ( err => reject(err))
    })   
  }
  getProductCountByStorefrontId(_storefrontId) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.getProductCountByStorefrontId.call(_storefrontId)
      .then( size => resolve(size))
      .catch ( err => reject(err))
    })     
  }

  getProduct(_storefrontId, _productId) {
    let self = this;
    return new Promise (function (resolve, reject) {
      self.instance.getProductsByProductId(_storefrontId, _productId)
      .then( product => resolve(product))
      .catch ( err => reject(err))
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
      .catch ( err => reject(err))
    })   
  }

}