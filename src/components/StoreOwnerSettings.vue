<template>
  <div>

    <h1>Store Owner</h1>
    <div>
        <label>Create Storeowner:</label> <input v-model="storefrontNameInput"/>
        <button @click="createStorefront(storefrontNameInput)" >Add Storefront</button>
    </div>
    <button @click="getOwnedStorefronts" >Get Storefront</button>
    <div>
      <h2>Storefronts</h2>
      <storefront-card 
        v-for="(store, index) in storefronts" 
        :key="index" 
        :storefront="store"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import StorefrontCard from '@/components/StorefrontCard';

import Marketplace from '../services/marketplace.js';
let market = new Marketplace();


export default {
  name: 'StoreOwnerSettings',
  components: {
    StorefrontCard
  },
  data() {
    return {
      storefrontNameInput: null,
      storefrontsData: []
    }
  },
  computed: {
    ...mapState({
      currentAccount: state => state.currentAccount
    }),    
    storefronts () {
      return this.storefrontsData;
    }
  },
  methods: {
    ...mapActions([
      'setStoreOwnerRole',
      'createStorefront'
    ]),
    async getOwnedStorefronts() {
      let self = this;
      let storefrontList = await market.getStorefrontsByAddress(self.currentAccount);
      self.storefrontsData = [];
      for (const storefrontId of storefrontList) {
        let storefront = await market.getStorefrontsById(Number(storefrontId))
        self.storefrontsData.push(storefront);
      }
    }    
  }
}
</script>
