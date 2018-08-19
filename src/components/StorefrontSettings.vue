<template>
  <div>

    <h1>Store Owner</h1>
    <div>
        <label>Create Storeowner:</label> <input v-model="storefrontNameInput"/>
        <button @click="setStorefront(storefrontNameInput)" >Add Storefront</button>
    </div>
    <div>
      <h2>Storefronts</h2>
      <ul>
        <li v-for="store in storefronts" :key="store.name">
          {{store.name}}
        </li>
      </ul>
    </div>
    <div>
        <label>Modify Storefront Name:</label> <input v-model="modifiedStorefrontNameInput"/>
        <button @click="modifyStorefront(modifiedStorefrontNameInput)" >Modify Storefront Name</button>
    </div>
    <div>
        <label>Remove Storefront Name:</label> <input v-model="removeStorefrontInput"/>
        <button @click="removeStorefront(removeStorefrontInput)" >Remove Storefront</button>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Marketplace from '../services/marketplace.js';
let market = new Marketplace();


export default {
  name: 'StorefrontSettings',
  data() {
    return {
      ...mapState({
        storefronts: state => state.storefronts
      }),      
      storefrontNameInput: null,
      removeStorefrontInput: null,
      modifiedStorefrontNameInput: null
    }
  },
  methods: {
    ...mapActions([
      'setStoreOwnerRole',
      'removeStoreOwnerRole'
    ]),
    getRoleByAddress() {
      let self = this;
      market.getRoleByAddress(self.roleAddressInput)
      .then(role => self.queriedRole = role.toNumber())
    }
  }
}
</script>

<style scoped>
</style>
