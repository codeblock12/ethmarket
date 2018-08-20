<template>
  <div>
		<button @click="goBack">Go back </button>
		<h1>Orders</h1>
		{{order}}
		<div class="card">
			<div> Timestamp:{{order[orderLabel.DATETIME]}} </div>
			<div> Price:{{priceInEther}} </div>
			<div> Quantity:{{order[orderLabel.QUANTITY]}} </div>
			<div> Status:{{order[orderLabel.STATUS]}} </div>
		</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ORDER } from '../constants'
import { toWei, fromWei } from '../utilities'

import Marketplace from '../services/marketplace.js'
let market = new Marketplace();

export default {
	name: 'Orders',
	data() {
		return {
			orderData: {},
			productData: {},
			orderLabel: ORDER
		}
	},
	computed: {
		...mapState({
			currentAccount: state => state.currentAccount
		}),
		product() {
			return this.productData || {};
		},
		order() {
			return this.orderData || {};
		},
		priceInEther() {
			return fromWei(this.orderData[this.orderLabel.PRICE]);
		}
	},
	methods: {
		goBack () {
			window.history.length > 1
					? this.$router.go(-1)
					: this.$router.push('/');
		}    
	},
	async mounted(){
		await market.init();
		refreshOrders(this);
		getProduct(this)
	}
}

async function refreshOrders(_vm) {
	let ordersCount = await market.getOrderCountByAddress(_vm.order[_vm.orderLabel.STOREFRONT_ID]);
	_vm.productsData = [];
	for (let i=0; i<ordersCount; i++) {
		let order = await market.getOrder(_vm.storefrontId, i)
		_vm.orderData.push(order);
	}
}

async function getProduct(_vm) {
	let product = await market.getProduct(
		_vm.order[_vm.orderLabel.STOREFRONT_ID], 
		_vm.order[_vm.orderLabel.PRODUCT_ID]
	);
	_vm.productData = product;
}

</script>