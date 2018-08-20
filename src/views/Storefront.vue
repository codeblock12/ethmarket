<template>
  <div>
		<button @click="goBack">Go back </button>
		
		<div>Storefront</div>

		<storefront-card :storefront="storefront" />
		
		<div>
        <label>Rename Storefront:</label> <input v-model="storefrontNameInput"/>
        <button @click="renameStorefront" >Rename Storefront</button>
    </div>

    <div>
        <button @click="deactiveStorefront" >Deactivate Storefront</button>
				<button @click="refreshStorefront" >Refresh Storefront</button>
    </div>

		<div>
				<button @click="withdrawFunds" >Withdraw Balance</button>
    </div>

		<div>Products</div>

		<div>
        <label>Name</label> <input v-model="productInput.name"/>
        <label>Price</label> <input v-model="productInput.price"/>
        <label>Quantity</label> <input v-model="productInput.quantity"/>
        <button @click="createProduct" >create Product</button>
				<button @click="refreshProducts" >Refresh Products</button>
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
import Marketplace from '../services/marketplace.js';

let market = new Marketplace();

export default {
	name: 'Storefront',
	components: {
		ProductCard,
		StorefrontCard		
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
		goBack () {
			window.history.length > 1
					? this.$router.go(-1)
					: this.$router.push('/');
		},
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