<template>
  <div>
    <div class="card" @click="goToProduct">
        <div> Timestamp:{{order[ORDER.DATETIME]}} </div>
        <div> Name:{{order[ORDER.PRODUCT_NAME]}} </div>
        <div> Price:{{priceInEther}} </div>
        <div> Quantity:{{order[ORDER.QUANTITY]}} </div>
        <div> Total:{{totalInEther}} </div>
    </div>
  </div>
</template>

<script>
import { ORDER } from '../constants'
import { fromWei } from '../utilities'

export default {
	name: 'OrderCard',
	props: {
		order: Array
	},
	data() {
		return {
			ORDER
		}
	},
	computed: {
		priceInEther() {
			return fromWei(this.order[ORDER.PRICE]);
		},
		totalInEther() {
			let total = this.order[ORDER.PRICE] * this.order[ORDER.QUANTITY];
			return fromWei(total);
		}
	},
	methods: {
    goToProduct() {
			let storefrontId = this.order[ORDER.STOREFRONT_ID];
			let productId = this.order[ORDER.PRODUCT_ID];
      this.$router.push(
				{ path: `/storefront/${storefrontId}/product/${productId}`}) //Todo: convert url to constant
		}	    
	}
}

</script>