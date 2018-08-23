import Vue from 'vue'
import Vuex from 'vuex'
import Blockchain from './services/blockchain';
import Marketplace from './services/marketplace';
import { NOTIFICATION_TIMEOUT, STOREFRONT } from './constants';

let market = new Marketplace();
let blockchain = new Blockchain();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentAccount: 'Account Loading...',
    accountRole: 'Role Loading...',
    ownerAccount: '',
    storefronts: [],
    notification: null
  },
  mutations: {
    setOwnerAccount(state, account){
      state.ownerAccount = account;
    },    
    setCurrentAccount(state, account){
      state.currentAccount = account;
    },
    setAccountBalance(state, balance){
      state.accountBalance = balance;
    },
    setAccountRole(state, role){
      state.accountRole = role;
    },
    setStorefronts(state, storefronts) {
      state.storefronts = storefronts;
    },
    setNotification(state, message) {
      state.notification = message;
    }
  },
  getters: {
    getStorefrontOwners(state) {
      return state.storefronts
      .map( store => store[STOREFRONT.OWNER])
      // .reduce((x, y) => x.includes(y) ? x : [...x, y], []) //get unique addresses
    } 
  },
  actions: {
    async setOwnerAccount({ commit }){
      await market.init();
      market.getOwnerAddress()
      .then(address => commit('setOwnerAccount', address))
    },    
    async getCurrentAccount({ commit }){
      await market.init();
      let account = await blockchain.getCurrentAccount();
      commit('setCurrentAccount', account);
      let role = await market.getRoleByAddress(account);
      commit('setAccountRole', Number(role))
    },
    setAdminRole({ state }, address){
      market.setAdminRoleByAddress(address, state.currentAccount)
      .then(() => console.log('successfully set admin role'))
    },
    removeAdminRole({ state }, address){
      market.removeAdminRoleByAddress(address, state.currentAccount)
      .then(() => console.log('successfully remove admin role'))
    },
    setStoreOwnerRole({ state }, address){
      market.setStoreOwnerByAddress(address, state.currentAccount)
      .then(() => console.log('successfully set admin role'))
    },
    removeStoreOwnerRole({ state }, address){
      market.removeStoreOwnerByAddress(address, state.currentAccount)
      .then(() => console.log('successfully remove admin role'))
    },
    async getStorefronts({ commit }){
      let storefronts = [];
      let storeSize = await market.getStorefrontCount();
      for (let i=0; i<storeSize; i++) {
        let storefront = await market.getStorefrontsById(i)
        storefronts.push(storefront);
      }
      commit('setStorefronts', storefronts);
    },    
    createStorefront({ state }, name){
      market.createStorefrontByName(name, state.currentAccount)
      .then(() => console.log('successfully created new storefront'))
    },
    sendNotification({ commit }, message) {
      commit('setNotification', message);
      setTimeout( () => {
        commit('setNotification', null);
      }, NOTIFICATION_TIMEOUT)
    }                 
  }
})