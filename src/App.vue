<template>
  <div id="app">
    <Header />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/settings">Settings</router-link> |
      <router-link to="/orders">Orders</router-link>
    </div>
    <router-view/>
    <notification />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Notification from '@/components/Notification.vue'

export default {
  name: 'App',
  components: {
    Header,
    Notification    
  }
}

</script>

<style>
@import '../node_modules/toastr/toastr.scss';

body {
  background-color: #2c3e50
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

label {
  margin-right: 10px;
}

.btn {
  margin-left: 15px;
  color: white
}

.card {
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 5px;
  transition: 0.3s;
  border: 1px solid #d3d3d3;
  border-radius: .25rem;
  width: 50%;
  margin-bottom: 10px;
  margin: 10px auto;
}
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2);
}
</style>
