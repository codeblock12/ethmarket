import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import marketplaceArtifact from '../build/contracts/Marketplace.json'

const web3 = new Web3(Web3.givenProvider);
const Marketplace = contract(marketplaceArtifact);
Marketplace.setProvider(web3.currentProvider);

class User {

}

class Marketplace {

    constructor () {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.contract = contract(marketplaceArtifact)
            self.contract.setProvider(window.web3.currentProvider)
            self.contract.deployed().then(instance => {
              self.instance = instance
              resolve()
            }).catch(err => {
              reject(err)
            })
        })
    }

    getCurrentAccount() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.instance.getAccounts.call(
              {from: window.web3.eth.accounts[0]}
            ).then(pseudo => {
              resolve(window.web3.toUtf8(pseudo))
            }).catch(err => {
              reject(err)
            })
          })
        web3.eth.getAccounts(function(err, accs){
            if(!err) {
              context.commit('setCurrentAccount', accs[0]);
            } else {
              console.error('err', err);
            }
          });        
    }

}

export default Blockchain;
export default User;
export default Marketplace;