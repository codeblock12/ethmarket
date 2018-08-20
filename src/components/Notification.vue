<template>
  <div class="notification" v-if="notification">
    <label>Notice: </label>{{notification}}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Notification',
  computed: {
    ...mapState({
      notification: state => state.notification,
    })
  }
}
</script>

<style>
.notification {
  position: absolute;
  z-index: 101;
  top: 0;
  left: 0;
  right: 0;
  background: #fde073;
  color:black;
  text-align: center;
  line-height: 2.5;
  overflow: hidden; 
  -webkit-box-shadow: 0 0 5px black;
  -moz-box-shadow:    0 0 5px black;
  box-shadow:         0 0 5px black;
}
</style>