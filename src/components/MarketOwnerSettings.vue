<template>
  <div>
      <h1>Owner</h1>
      <div>
          <label>Create Admin:</label> <input v-model="addAdminInput"/>
          <button @click="setAdminRole(addAdminInput)" >Add Admin</button>
      </div>
      <div>
          <label>Remove Admin:</label> <input v-model="removeAdminInput"/>
          <button @click="removeAdminRole(removeAdminInput)" >Remove Admin</button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MarketOwnerSettings',
  data() {
    return {
      removeAdminInput: null,
      addAdminInput: null,
    }
  },
  methods: {
    ...mapActions([
      'setAdminRole',
      'removeAdminRole'
    ])
  }
}
</script>