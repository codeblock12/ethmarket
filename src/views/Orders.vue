<template>
  <div>
		<button @click="goBack">Go back </button>
		<h1>Orders</h1>
		<order-card 
			v-for="(order, index) in orders"
			:key="index"		
			:order="order"/>
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