<template>
  <div>
		<back-navigation />
		
		<div>Storefront</div>

		<storefront-card :storefront="storefront" />
		
		<div>
        <label>Rename Storefront:</label> <input v-model="storefrontNameInput"/>
        <a href="#" class="btn" @click="renameStorefront" >Rename Storefront</a>
    </div>

    <div>
        <a href="#" class="btn" @click="deactiveStorefront" >Deactivate Storefront</a>
				<a href="#" class="btn" @click="refreshStorefront" >Refresh Storefront</a>
    </div>

		<div>
				<a href="#" class="btn" @click="withdrawFunds" >Withdraw Balance</a>
    </div>

		<div>Products</div>

		<div>
        <label>Name</label> <input v-model="productInput.name"/>
        <label>Price</label> <input v-model="productInput.price"/>
        <label>Quantity</label> <input v-model="productInput.quantity"/>
        <a href="#" class="btn" @click="createProduct" >create Product</a>
				<a href="#" class="btn" @click="refreshProducts" >Refresh Products</a>
    </div>
	<product-card
		v-for="(product, index) in products"
		:key="index"
		:product="product">
	</product-card>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toWei } from '../utilities'
import ProductCard from '@/components/ProductCard';
import StorefrontCard from '@/components/StorefrontCard.vue'
import BackNavigation from '@/components/BackNavigation'

import Marketplace from '../services/marketplace.js';

let market = new Marketplace();

export default {
	name: 'Storefront',
	components: {
		ProductCard,
		StorefrontCard,
		BackNavigation				
	},
	data() {
		return {
			storefrontData: [],
			productsData: [],
			storefrontId: this.$route.params.id,
			storefrontNameInput: null,
			productInput: {
				name: '',
				price: '',
				quantity: ''
			}
		}
	},
	computed: {
		...mapState({
			currentAccount: state => state.currentAccount
		}),    
		storefront () {
			return this.storefrontData;
		},
		products() {
			return this.productsData;
		}
	},
	methods: {
		async deactiveStorefront(){
			await market.deactivateStorefront(
				this.storefrontId, 
				this.currentAccount);
			refreshStorefront(this);
		},
		async renameStorefront(){
			await market.renameStorefront(
				this.storefrontId,				
				this.storefrontNameInput, 
				this.currentAccount);
			await refreshStorefront(this);
		},
		async createProduct(){
			await market.createProduct(
				this.storefrontId,
				this.productInput.name,
				toWei(this.productInput.price),
				this.productInput.quantity,
				this.currentAccount
			);
			refreshStorefront(this);
		},
		async withdrawFunds(){
			await market.withdrawStorefrontFunds(this.storefrontId, this.currentAccount)
			refreshStorefront(this);
		},
		refreshProducts() {
			refreshProducts(this);	
		},
		refreshStorefront() {
			refreshStorefront(this);
		}			    
	},
	async mounted(){
		await market.init();
		await refreshStorefront(this)
		refreshProducts(this);	
	}
}

async function refreshStorefront(_vm) {
	let storefront = await market.getStorefrontsById(_vm.storefrontId);
	_vm.storefrontData = storefront;
}

async function refreshProducts(_vm) {
	let storeSize = await market.getProductCountByStorefrontId(_vm.storefrontId);
	_vm.productsData = [];
	for (let i=0; i<storeSize; i++) {
		let product = await market.getProduct(_vm.storefrontId, i)
		_vm.productsData.push(product);
	}
}

</script>