<template>
  <div>

    <h1>Store Owner</h1>
    <div>
        <label>Create Storeowner:</label> <input v-model="storefrontNameInput"/>
        <button @click="createStorefront(storefrontNameInput)" >Add Storefront</button>
    </div>
    <button @click="getStorefronts" >Get Storefront</button>
    <div>
      <h2>Storefronts</h2>
      <ul>
        <li v-for="store in getStorefrontsByCurrentAccount" :key="store.storefrontId">
          {{store}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import Marketplace from '../services/marketplace.js';
let market = new Marketplace();


export default {
  name: 'StoreOwnerSettings',
  data() {
    return {
      storefrontNameInput: null
    }
  },
  computed: {
    ...mapGetters([
      'getStorefrontsByCurrentAccount'
    ])
  },
  methods: {
    ...mapActions([
      'setStoreOwnerRole',
      'createStorefront',
      'getStorefronts'
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
