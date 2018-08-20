<template>
  <div>
		<button @click="goBack">Go back </button>
		StoreId: {{storefrontId}}
		<h1>Product</h1>
		{{product}}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Marketplace from '../services/marketplace.js';
let market = new Marketplace();

export default {
	name: 'Storefront',
	data() {
		return {
			productData: null,
			storefrontId: this.$route.params.sid,
			productId: this.$route.params.pid
		}
	},
	computed: {
		...mapState({
			currentAccount: state => state.currentAccount
		}),
		product() {
			return this.productData;
		}
	},
	methods: {
		goBack () {
			window.history.length > 1
					? this.$router.go(-1)
					: this.$router.push('/');
		},
		async deactivateProduct(){
			await market.deactivateProduct(
				this.storefrontId,
				this.productId, 
				this.currentAccount);
			refreshProduct(this);
		}		    
	},
	async mounted(){
		await market.init();
		refreshProduct(this)
	}
}

async function refreshProduct(_vm) {
	let product = await market.getProductById(_vm.storefrontId, _vm.productId);
	_vm.productData = product;
}

</script>