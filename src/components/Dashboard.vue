<template>
  <div>
    <div>
      <h1>{{ msg }}</h1>
      <div>You are logged in as: {{account}}</div>
      <div>Role: {{currentAccountRoleLabel}}</div>
      <button @click="getCurrentRole(account)"> Get Role</button>
    </div>

    <div>
        <label>Role:</label> <input v-model="roleAddressInput"/>
        <button @click="getRoleByAddress"> Get Role</button>
        Role: {{queriedRoleLabel}}
    </div>

    <div>
        <label>Create Admin:</label> <input v-model="addAdminInput"/>
        <button @click="setAdminRole(addAdminInput)" >Add Admin</button>
    </div>

    <div>
        <label>Remove Admin:</label> <input v-model="removeAdminnInput"/>
        <button @click="removeAdminRole(removeAdminnInput)" >Remove Admin</button>
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
      addAdminInput: null,
      removeAdminnInput: null,
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
      'getCurrentRole',
      'setAdminRole',
      'removeAdminRole'
    ]),
    getRoleByAddress() {
      let self = this;
      market.getRoleByAddress(self.roleAddressInput)
      .then(role => self.queriedRole = role.toNumber())
    }
  },
  mounted(){
    let self = this;
    this.$store.dispatch('getCurrentAccount');
    this.$store.dispatch('getCurrentRole');
    window.web3.currentProvider.publicConfigStore.on('update', function(){
      self.$store.dispatch('getCurrentAccount');
      self.$store.dispatch('getCurrentRole');
    });
  }
}
</script>

<style scoped>
</style>
