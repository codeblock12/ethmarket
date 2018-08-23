<template>
  <div>
      <h1>Owner</h1>
      <div>
          <label>Create Admin:</label> <input v-model="addAdminInput"/>
          <a href="#" class="btn" @click="setAdminRole(addAdminInput)" >Add Admin</a>
      </div>
      <div>
          <label>Remove Admin:</label> <input v-model="removeAdminInput"/>
          <a href="#" class="btn" @click="removeAdminRole(removeAdminInput)" >Remove Admin</a>
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