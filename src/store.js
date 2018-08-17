import Vue from 'vue'
import Vuex from 'vuex'

import Marketplace from 'blockchainService.js';

Vue.use(Vuex);

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
