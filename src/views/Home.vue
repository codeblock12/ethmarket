<template>
  <div class="home">
      <h2>Storefronts</h2>
      <storefront-card 
        v-for="(store, index) in storefronts" 
        :key="index" 
        :storefront="store"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StorefrontCard from '@/components/StorefrontCard.vue'
import Marketplace from '@/services/marketplace';

let market = new Marketplace();

export default {
  name: 'home',
  components: {
    StorefrontCard
  },
  computed: {
		...mapState({
      storefronts: state => state.storefronts
		})
  },
  async mounted() {
    await market.init();
    this.$store.dispatch('getStorefronts');
  }
}
</script>
