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
    getCurrentAccount(context){
      blockchain.getCurrentAccount()
      .then( account => { 
        context.commit('setCurrentAccount', account)
      });
    },
    getCurrentRole(context){
      market.init()
      .then( instance => {
        market.getRoleByAddress(context.state.currentAccount)
        .then(role => context.commit('setAccountRole', role.toNumber()))
      })
    },
    setAdminRole(context, address){
      market.setAdminRoleByAddress(address, context.state.currentAccount)
      .then(success => console.log('successfully set admin role'))
    },
    removeAdminRole(context, address){
      market.removeAdminRoleByAddress(address, context.state.currentAccount)
      .then(success => console.log('successfully remove admin role'))
    }          
  }
})