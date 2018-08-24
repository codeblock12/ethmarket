<template>
  <div>

		<back-navigation/>
		
		<StorefrontSettings />
		
		<a href="#" class="btn" @click="refreshProducts" >Refresh Products</a>
		
		<ProductCard
			v-for="(product, index) in products"
			:key="index"
			:product="product">
		</ProductCard>

  </div>
</template>

<script>
import { mapState } from "vuex";
import StorefrontSettings from "@/components/StorefrontSettings";
import BackNavigation from "@/components/BackNavigation";
import ProductCard from "@/components/ProductCard";
import { STOREFRONT } from "../constants";

import Marketplace from "../services/marketplace.js";

let market = new Marketplace();

export default {
  name: "Storefront",
  components: {
		BackNavigation,
		StorefrontSettings,
		ProductCard		
  },
  data() {
    return {
			productsData: [],
      storefrontId: this.$route.params.id,			
    };
  },
  computed: {
    ...mapState({
      currentAccount: state => state.currentAccount
    }),
    products() {
      return this.productsData;
		}
  },
  methods: {
    refreshProducts() {
      refreshProducts(this);
    }
  },
  async mounted() {
    await market.init();
  	refreshProducts(this);
  }
};

async function refreshProducts(_vm) {
  let storeSize = await market.getProductCountByStorefrontId(_vm.storefrontId);
  _vm.productsData = [];
  for (let i = 0; i < storeSize; i++) {
    let product = await market.getProduct(_vm.storefrontId, i);
    _vm.productsData.push(product);
  }
}
</script>

<style scoped>
	ul {
  	list-style: none;
	}
</style>