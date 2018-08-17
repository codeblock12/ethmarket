import Vue from 'vue'
import Vuex from 'vuex'
import Blockchain from './services/blockchain';
import Marketplace from './services/marketplace.js';

let market = new Marketplace();
let blockchain = new Blockchain();

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
      blockchain.getCurrentAccount()
      .then( account => context.commit('setCurrentAccount', account));
    },
    getAccountBalance(){},
    getAccountRole(context){
      market.role.call(context.state.currentAccount)
      .then(role => context.commit('setAccountRole', role.toNumber()))
    }
  }
})
