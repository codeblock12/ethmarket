<template>
  <div>
		<button @click="goBack">Go back </button>
		StoreId: {{storefrontId}}
		<div>Storefront</div>
		{{storefront}}
		
		<div>
        <label>Rename Storefront:</label> <input v-model="storefrontNameInput"/>
        <button @click="renameStorefront" >Rename Storefront</button>
    </div>

    <div>
        <button @click="deactiveStorefront" >Deactivate Storefront</button>
				<button @click="refreshStorefront" >Refresh Storefront</button>
    </div>

		<div>Products</div>

		<div>
        <label>Name</label> <input v-model="productInput.name"/>
        <label>Price</label> <input v-model="productInput.price"/>
        <label>Quantity</label> <input v-model="productInput.quantity"/>
        <button @click="createProduct" >create Product</button>
				<button @click="refreshProducts" >Refresh Products</button>
				<p>{{productInput}}</p>
    </div>
		<div class="card">
				<ul>
					<li v-for="(product, index) in products" 
						:key="index" 
						@click="goToProduct(product[0])">
							{{product}}
					</li>
				</ul>	
		</div>	

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
			storefrontData: null,
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
				this.productInput.price,
				this.productInput.quantity,
				this.currentAccount
			);
			refreshStorefront(this);
		},
		async withdrawFunds(){
			await market.withdrawStorefrontFunds(this.storefrontId, this.currentAccount)
			refreshStorefront(this);
		},
    goToProduct(_productId) {
      this.$router.push(
				{ path: `/storefront/${this.storefrontId}/product/${_productId}`}) //Todo: convert url to constant
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
		let product = await market.getProductByStorefrontId(_vm.storefrontId, i)
		_vm.productsData.push(product);
	}
}

</script>

<style scoped>
	.card {
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px; /* 5px rounded corners */
		padding: 5px;
    transition: 0.3s;
	}
	.card:hover {
			box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
	}	
</style>