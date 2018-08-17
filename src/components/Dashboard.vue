<template>
  <div>
    <h1>{{ msg }}</h1>
    <div>You are logged in as: {{account}}</div>
    <div>Your role: {{role}}</div>

    <button @click="getCurrentAccount" >Load Account</button>
    <button @click="getAccountRole" >Load Role</button>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  props: {
    msg: String
  },
  computed: mapState({
    account: state => state.currentAccount,
    role: state => state.accountRole
  }),
  methods: mapActions([
    'getCurrentAccount',
    'getAccountRole'
  ])
}
</script>

<style scoped>
</style>
