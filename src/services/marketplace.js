import { default as contract } from 'truffle-contract'
import marketplaceArtifact from '../../build/contracts/Marketplace.json'

const web3 = window.web3;
const caller = web3.eth.accounts[0];

export default class Marketplace {
    constructor () {
        let self = this;
        self.contract = contract(marketplaceArtifact)
        self.contract.setProvider(web3.currentProvider)
        self.contract.deployed().then(instance => {
          self.instance = instance
        }).catch(err => console.error('marketplace service erred: ', err))
    }

    getAccountRoleByAddress (address) {
      let self = this;
      return new Promise (function (resolve, reject) {
        self.instance.role.call(address)
        .then( role => resolve(role))
        .catch ( err => reject(err))
      }) 
    }

    setAdminRoleByAddress (address) {
        let self = this;
        return new Promise (function (resolve, reject) {
          self.instance.setAdmin.call(address, {from: caller})
          .then( role => resolve(role))
          .catch ( err => reject(err))
        }) 
    }
}