<template>
  <div class="home">
    <StorefrontCard msg="Welcome to the Eth Market App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import StorefrontCard from '@/components/StorefrontCard.vue'


export default {
  name: 'home',
  components: {
    StorefrontCard
  }
}
</script>
