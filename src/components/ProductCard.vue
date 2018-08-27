<template>
  <div>
    <div class="card" @click="goToProduct">
        <div> Name {{product[PRODUCT.NAME]}} </div>
        <div> Price {{priceInEther}} </div>
        <div> Quantity {{product[PRODUCT.QUANTITY]}} </div>
        <div> Status {{product[PRODUCT.STATUS]}} </div>
    </div>
  </div>
</template>

<script>
import { PRODUCT } from '../constants'
import { fromWei } from '../utilities'

export default {
	name: 'ProductCard',
	props: {
		product: Array
	},
	data() {
		return {
			PRODUCT
		}
	},
	computed: {
		priceInEther() {
			return fromWei(this.product[PRODUCT.PRICE]);
		}
	},
	methods: {
    goToProduct() {
			let storefrontId = this.product[PRODUCT.STOREFRONT_ID];
			let productId = this.product[PRODUCT.PRODUCT_ID];
      this.$router.push(
				{ path: `/storefront/${storefrontId}/product/${productId}`}) //Todo: convert url to constant
		}	    
	}
}

</script>