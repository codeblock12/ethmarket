<template>
  <div>
    <div>
      <h1>{{ msg }}</h1>
      <div>You are logged in as: {{account}}</div>
      <button @click="getCurrentAccount" >Load Account</button>
    </div>

    <div>
        <label>Get role:</label> <input v-model="roleAddressInput"/>
        <div>Role: {{role}}</div>
        <button @click="getAccountRole"> Get Role</button>
    </div>

    <div>
        <label>Create Admin:</label> <input v-model="addAdminInput"/>
        <button @click="addAdmin" >Add Admin</button>
    </div>

    <div>
        <label>Remove Admin:</label> <input v-model="removeAdminnInput"/>
        <button @click="removeAdmin" >Remove Admin</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
  computed: mapState({
    account: state => state.currentAccount,
    role: state => state.accountRole
  }),
  methods: mapActions([
    'getCurrentAccount',
    'getAccountRole',
    'addAdmin',
    'removeAdmin'
  ])
}
</script>

<style scoped>
</style>
