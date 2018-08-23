<template>
  <div>

    <div v-if="isMarketOwner || isAdmin">
        <label>Get Role:</label> <input v-model="roleAddressInput"/>
        <a href="#" class="btn" @click="getRoleByAddress"> Get Role</a>
        <div>Role: {{queriedRoleLabel}}</div>
    </div>

    <MarketOwnerSettings v-if="isMarketOwner" />
    <AdminSettings v-if="isAdmin" />  
    <StoreOwnerSettings v-if="isStoreOwner" />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ROLES } from '@/constants';
import { getRoleById } from '@/utilities'

import MarketOwnerSettings from '@/components/MarketOwnerSettings.vue'
import StoreOwnerSettings from '@/components/StoreOwnerSettings.vue'
import AdminSettings from '@/components/AdminSettings.vue'

import Marketplace from '@/services/marketplace.js';
let market = new Marketplace();


export default {
  name: 'Settings',
  components: {
    StoreOwnerSettings,
    AdminSettings,
    MarketOwnerSettings        
  },
  data() {
    return {
      roleAddressInput: null,
      queriedRole: null
    }
  },
  computed: {
    ...mapState({
      currentAccount: state => state.currentAccount,
      currentRole: state => state.accountRole,
      ownerAccount: state => state.ownerAccount
    }),
    currentAccountRoleLabel(){
      return getRoleById(this.currentRole);
    },
    queriedRoleLabel() {
      return getRoleById(this.queriedRole);
    },
    isMarketOwner(){
      return this.currentAccount.toUpperCase() == this.ownerAccount.toUpperCase();
    },
    isAdmin(){
      return this.currentRole == ROLES.ADMIN;
    },
    isStoreOwner(){
      return this.currentRole == ROLES.STORE_OWNER;
    }
  },
  methods: {
    getRoleByAddress() {
      let self = this;
      market.getRoleByAddress(self.roleAddressInput)
      .then(role => self.queriedRole = role.toNumber())
    }
  },
  mounted () {
    this.$store.dispatch('setOwnerAccount');
  }  
}
</script>

<style scoped>
</style>
