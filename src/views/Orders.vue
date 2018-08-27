<template>
  <div>
		<h1>Orders</h1>
		<order-card 
			v-for="(order, index) in orders"
			:key="index"		
			:order="order">
		</order-card>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import OrderCard from '@/components/OrderCard'
import Marketplace from '../services/marketplace.js'
let market = new Marketplace();

export default {
	name: 'Orders',
	components: {
		OrderCard
	},
	data() {
		return {
			orderData: []
		}
	},
	computed: {
		...mapState({
      currentAccount: state => state.currentAccount
		}),		
		orders() {
			return this.orderData;
		}
	},
	async mounted(){
		await market.init();
		getOrders(this)
	}
}

async function getOrders(_vm) {
	await _vm.$store.dispatch('getCurrentAccount');
	let ordersCount = await market.getOrderCountByAddress(_vm.currentAccount);
	_vm.orderData = [];
	for (let i=0; i<ordersCount; i++) {
		let order = await market.getOrder(_vm.currentAccount, i)
		_vm.orderData.push(order);
	}
}

</script>