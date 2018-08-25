<template>
  <div>
		<back-navigation />
		<h1>Product</h1>
		<div class="card margin-below">
			<div> Name {{product[productLabel.NAME]}} </div>
			<div> Price {{priceInEther}} </div>
			<div> Quantity {{product[productLabel.QUANTITY]}} </div>
			<div> Status {{statusLabel}} </div>
		</div>

		<a href="#" class="btn" v-if="isStoreOwner" @click="deactivateProduct"> Cancel Product Listing </a>

		<div class="margin-below">
        <label>Quantity</label> <input v-model="quantityToBuyInput"/>
				<a href="#" class="btn" @click="buyProduct"> Buy </a>
    </div>
		
		<div> Total {{totalInEther}} Ether</div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { PRODUCT, ROLES } from '../constants'
import { fromWei, getProductStatusById } from '../utilities'
import BackNavigation from '@/components/BackNavigation'

import Marketplace from '../services/marketplace.js'

let market = new Marketplace();

export default {
	name: 'Storefront',
	components: {
		BackNavigation		
	},
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
			currentAccount: state => state.currentAccount,
			currentRole: state => state.currentRole
		}),
		product() {
			return this.productData || {};
		},
		priceInEther() {
			return fromWei(this.product[PRODUCT.PRICE]);
		},
		totalInEther() {
			let total = this.product[PRODUCT.PRICE] * this.quantityToBuyInput;
			return fromWei(total);
		},
		statusLabel(){
			return getProductStatusById(this.product[this.productLabel.STATUS])
		},
    isStoreOwner(){
      return this.currentRole == ROLES.STORE_OWNER;
    }				
	},
	methods: {
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