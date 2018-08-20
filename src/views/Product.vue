<template>
  <div>
		<button @click="goBack">Go back </button>
		StoreId: {{storefrontId}}
		<h1>Product</h1>
		{{product}}
		<div class="card">
			<div> Name:{{product[productLabel.NAME]}} </div>
			<div> Price:{{priceInEther}} </div>
			<div> Quantity:{{product[productLabel.QUANTITY]}} </div>
			<div> Status:{{product[productLabel.STATUS]}} </div>
		</div>

		<button @click="deactivateProduct"> Deactivate </button>

		<div>
        <label>Quantity</label> <input v-model="quantityToBuyInput"/>
				<button @click="buyProduct"> Buy </button>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { PRODUCT_STATUS, PRODUCT } from '../constants'
import { toWei, fromWei } from '../utilities'

import Marketplace from '../services/marketplace.js'

let market = new Marketplace();

export default {
	name: 'Storefront',
	data() {
		return {
			productData: null,
			storefrontId: this.$route.params.sid,
			productId: this.$route.params.pid,
			quantityToBuyInput: 1,
			productLabel: PRODUCT
		}
	},
	computed: {
		...mapState({
			currentAccount: state => state.currentAccount
		}),
		product() {
			return this.productData || {};
		},
		priceInEther() {
			return fromWei(this.product[PRODUCT.PRICE]);
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
				this.currentAccount
			);
			refreshProduct(this);
		},
		async buyProduct() {
			let total = this.quantityToBuyInput * this.productData[PRODUCT.PRICE];
			console.log(total);
			await market.buyProduct(
				this.storefrontId,
				this.productId, 
				this.quantityToBuyInput,
				total,
				this.currentAccount
			);
			refreshProduct(this);			
		}		    
	},
	async mounted(){
		await market.init();
		refreshProduct(this)
	}
}

async function refreshProduct(_vm) {
	let product = await market.getProduct(_vm.storefrontId, _vm.productId);
	_vm.productData = product;
}

</script>