<template>
  <div>
      <h1>Admin</h1>
      <div>
          <label>Create Storeowner:</label> <input v-model="addStoreOwnerInput"/>
          <a href="#" class="btn" @click="setStoreOwnerRole(addStoreOwnerInput)" >Add StoreOwner</a>
      </div>
      <div>
          <label>Create Storeowner:</label> <input v-model="removeStoreOwnerInput"/>
          <a href="#" class="btn" @click="removeStoreOwnerRole(removeStoreOwnerInput)"> Remove StoreOwner</a>
      </div>      
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AdminSettings',
  data() {
    return {
      addStoreOwnerInput: null,
      removeStoreOwnerInput: null
    }
  },  
  methods: {
    ...mapActions([
      'setStoreOwnerRole',
      'removeStoreOwnerRole'
    ]) 
  }
}
</script>
