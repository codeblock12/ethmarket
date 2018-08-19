<template>
  <div>
    <div>
      <div>You are logged in as: {{account}}</div>
      <div>Role: {{currentAccountRoleLabel}}</div>
    </div>
    <div>
        <label>Role:</label> <input v-model="roleAddressInput"/>
        <button @click="getRoleByAddress"> Get Role</button>
        Role: {{queriedRoleLabel}}
    </div>
    <h1>Owner</h1>
    <div>
        <label>Create Admin:</label> <input v-model="addAdminInput"/>
        <button @click="setAdminRole(addAdminInput)" >Add Admin</button>
    </div>
    <div>
        <label>Remove Admin:</label> <input v-model="removeAdminnInput"/>
        <button @click="removeAdminRole(removeAdminnInput)" >Remove Admin</button>
    </div>
    <h1>Admin</h1>
    <div>
        <label>Create Storeowner:</label> <input v-model="addStoreOwnerInput"/>
        <button @click="setStoreOwnerRole(addStoreOwnerInput)" >Add StoreOwner</button>
    </div>
    <div>
        <label>Remove Storeowner:</label> <input v-model="removeStoreOwnerInput"/>
        <button @click="removeStoreOwnerRole(removeStoreOwnerInput)" >Remove StoreOwner</button>
    </div>
    <StoreOwnerSettings />    
    <h1>Shopper</h1>


  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getRoleById } from '../utilities'

import StoreOwnerSettings from '@/components/StoreOwnerSettings.vue'

import Marketplace from '../services/marketplace.js';
let market = new Marketplace();


export default {
  name: 'Settings',
  components: {
    StoreOwnerSettings
  },
  data() {
    return {
      roleAddressInput: null,
      addAdminInput: null,
      removeAdminnInput: null,
      addStoreOwnerInput: null,
      removeStoreOwnerInput: null,
      queriedRole: null
    }
  },
  computed: {
    ...mapState({
      account: state => state.currentAccount,
      role: state => state.accountRole
    }),
    currentAccountRoleLabel(){
      return getRoleById(this.role);
    },
    queriedRoleLabel() {
      return getRoleById(this.queriedRole);
    }
  },
  methods: {
    ...mapActions([
      'setAdminRole',
      'removeAdminRole',
      'setStoreOwnerRole',
      'removeStoreOwnerRole'
    ]),
    getRoleByAddress() {
      let self = this;
      market.getRoleByAddress(self.roleAddressInput)
      .then(role => self.queriedRole = role.toNumber())
    }
  },
  mounted(){
    var self = this
    self.$store.dispatch('getCurrentAccount')
    window.web3.currentProvider.publicConfigStore
    .on('update', () => self.$store.dispatch('getCurrentAccount') )
  }
}
</script>

<style scoped>
</style>
