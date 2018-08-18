import Vue from 'vue'
import Vuex from 'vuex'
import Blockchain from './services/blockchain';
import Marketplace from './services/marketplace';
import { waitForAsync } from './utilities';

let market = new Marketplace();
let blockchain = new Blockchain();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentAccount: web3.eth.accounts[0] || 'Account Loading...',
    accountRole: 'Role Loading...'
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
    getCurrentAccount({ commit, dispatch, state }){
      market.init()
      .then( instance => {  
        blockchain.getCurrentAccount()
        .then( account => { 
          commit('setCurrentAccount', account)
          market.getRoleByAddress(account)
          .then(role => commit('setAccountRole', role.toNumber()))          
        })          
      })
    },
    setAdminRole({ state }, address){
      market.setAdminRoleByAddress(address, state.currentAccount)
      .then(success => console.log('successfully set admin role'))
    },
    removeAdminRole({ state }, address){
      market.removeAdminRoleByAddress(address, state.currentAccount)
      .then(success => console.log('successfully remove admin role'))
    }          
  }
})