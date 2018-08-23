<template>
  <div>
    Account: {{currentAccount}} || Role: {{currentAccountRoleLabel}}
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getRoleById } from '../utilities'

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
  mounted(){
    var self = this
    self.$store.dispatch('getCurrentAccount')
    window.web3.currentProvider.publicConfigStore
    .on('update', () => self.$store.dispatch('getCurrentAccount') )
  }
}
</script>