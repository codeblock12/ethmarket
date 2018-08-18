import { default as contract } from 'truffle-contract'
import marketplaceArtifact from '../../build/contracts/Marketplace.json'

const web3 = window.web3;

const defaultGasLimit = 50000;

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

    getRoleByAddress (address) {
      let self = this;
      return new Promise (function (resolve, reject) {
        self.instance.role.call(address)
        .then( role => resolve(role))
        .catch ( err => reject(err))
      }) 
    }

    setAdminRoleByAddress (address, caller) {
        let self = this;
        return new Promise (function (resolve, reject) {
          self.instance.addAdmin(address, {from: caller, gas: defaultGasLimit})
          .then( role => resolve(role))
          .catch ( err => reject(err))
        }) 
    }

    removeAdminRoleByAddress (address, caller) {
      let self = this;
      return new Promise (function (resolve, reject) {
        self.instance.removeAdmin(address, {from: caller, gas: defaultGasLimit})
        .then( role => resolve(role))
        .catch ( err => reject(err))
      }) 
  }
}