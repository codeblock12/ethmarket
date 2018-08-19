<template>
  <div>
    <div>
      <h1>{{ msg }}</h1>
      <div>You are logged in as: {{account}}</div>
      <div>Role: {{currentAccountRoleLabel}}</div>
    </div>
    <div>
        <label>Role:</label> <input v-model="roleAddressInput"/>
        <button @click="getRoleByAddress"> Get Role</button>
        Role: {{queriedRoleLabel}}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getRoleById } from '../utilities'

import Marketplace from '../services/marketplace.js';
let market = new Marketplace();


export default {
  name: 'Dashboard',
  props: {
    msg: String
  },
  data() {
    return {
      roleAddressInput: null,
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
