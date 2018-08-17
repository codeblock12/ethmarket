<template>
  <div class="home">
    <img src="../assets/logo.png">
    <Dashboard msg="Welcome to the Eth Market App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/Dashboard.vue'

export default {
  name: 'home',
  components: {
    Dashboard
  }
}
</script>
