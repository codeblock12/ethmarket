<template>
  <div>
    Account: {{currentAccount}} || Role: {{currentAccountRoleLabel}}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getRoleById } from '../utilities'
import Marketplace from '../services/marketplace.js';
let market = new Marketplace();


export default {
  name: 'Header',
  computed: {
    ...mapState({
      currentAccount: state => state.currentAccount,
      currentRole: state => state.accountRole
    }),
    currentAccountRoleLabel(){
      return getRoleById(this.currentRole);
    }
  },  
  methods: {
    ...mapActions([
      'setAdminRole',
      'removeAdminRole',
      'setStoreOwnerRole',
      'removeStoreOwnerRole'
    ])
  },  
  mounted(){
    var self = this
    self.$store.dispatch('getCurrentAccount')
    window.web3.currentProvider.publicConfigStore
    .on('update', () => self.$store.dispatch('getCurrentAccount') )
  }
}
</script>