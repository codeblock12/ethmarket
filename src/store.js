import Vue from 'vue'
import Vuex from 'vuex'

import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

import marketplaceArtifact from '../build/contracts/Marketplace.json'

Vue.use(Vuex);

const Role = {
  Admin: 0,
  StorefrontOwner: 1,
  Shopper: 2
};

const web3 = new Web3(Web3.givenProvider);

const Marketplace = contract(marketplaceArtifact);
Marketplace.setProvider(web3.currentProvider);

export default new Vuex.Store({
  state: {
    currentAccount: 'No Account Detected',
    accountBalance: null,
    accountRole: null
  },
  mutations: {
    setCurrentAccount(state, account){
      state.currentAccount = account;
    },
    setAccountBalance(state, balance){
      state.accountBalance = balance;
    },
    setAccountRole(state, role){
      state.accountRole = role;
    }
  },
  actions: {
    getCurrentAccount(context){
      web3.eth.getAccounts(function(err, accs){
        if(!err) {
          context.commit('setCurrentAccount', accs[0]);
        } else {
          console.error('err', err);
        }
      });
    },
    getAccountBalance(){},
    getAccountRole(context){
      Marketplace.deployed().then(function(instance){
        instance.role.call(context.state.currentAccount).then(function(role){
          context.commit('setAccountRole', role.toNumber());
        })
      })
    }
  }
})
