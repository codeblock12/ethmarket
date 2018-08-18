<template>
  <div>
    <div>
      <h1>{{ msg }}</h1>
      <div>You are logged in as: {{account}}</div>
      <div>Role: {{roleLabel}}</div>
      <button @click="getAccountRole(account)"> Get Role</button>
    </div>

    <div>
        <label>Role:</label> <input v-model="roleAddressInput"/>
        <button @click="getAccountRole"> Get Role</button>
    </div>

    <div>
        <label>Create Admin:</label> <input v-model="addAdminInput"/>
        <button @click="addAdmin(addAdminInput)" >Add Admin</button>
    </div>

    <div>
        <label>Remove Admin:</label> <input v-model="removeAdminnInput"/>
        <button @click="removeAdmin" >Remove Admin</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getRoleById } from '../utilities'

export default {
  name: 'Dashboard',
  props: {
    msg: String
  },
  data() {
    return {
      roleAddressInput: '',
      addAdminInput: '',
      removeAdminnInput: ''
    }
  },
  computed: {
    ...mapState({
      account: state => state.currentAccount,
      role: state => state.accountRole
    }),
    roleLabel(){
      return getRoleById(this.role);
    }
  },
  methods: {
    ...mapActions([
      'getAccountRole',
      'addAdmin',
      'removeAdmin'
    ])
  },
  mounted(){
    this.$store.dispatch('getCurrentAccount');
  }
}
</script>

<style scoped>
</style>
