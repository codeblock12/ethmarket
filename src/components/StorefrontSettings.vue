<template>
  <div v-if="ownedStorefront"> 
    <div class="card"> 
      <div><label>Id</label> {{storefront[STOREFRONT.STOREFRONT_ID]}} </div>
      <div> <label>Name</label> {{storefront[STOREFRONT.NAME]}} </div>
      <div> <label>Balance</label> {{balanceInEther}} </div>
      <div> <label>Active</label> {{storefront[STOREFRONT.IS_ACTIVE]}} </div>
    </div>
				
    <ul>
      <li>
        <input v-model="storefrontNameInput"/>
        <a href="#" class="btn" @click="renameStorefront" >Rename Storefront</a>
      </li>
      <li><a href="#" class="btn" @click="deactiveStorefront" >Deactivate Storefront</a></li>
      <li><a href="#" class="btn" @click="refreshStorefront" >Refresh Storefront</a></li>
      <li><a href="#" class="btn" @click="withdrawFunds" >Withdraw Balance</a></li>
    </ul>		

		<div>
				<label>Name</label> <input v-model="productInput.name"/>
				<label>Price</label> <input v-model="productInput.price"/>
				<label>Quantity</label> <input v-model="productInput.quantity"/>
				<a href="#" class="btn" @click="createProduct" >create Product</a>
				<a href="#" class="btn" @click="refreshProducts" >Refresh Products</a>
		</div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { toWei, fromWei } from "../utilities";
import { STOREFRONT } from "../constants";
import Marketplace from "../services/marketplace.js";

let market = new Marketplace();

export default {
  name: "StorefrontSettings",
  data() {
    return {
      storefrontData: [],
      storefrontId: this.$route.params.id,
      storefrontNameInput: null,
      productInput: {
        name: "",
        price: "",
        quantity: ""
      },
      STOREFRONT
    };
  },
  computed: {
    ...mapState({
      currentAccount: state => state.currentAccount
    }),
    storefront() {
      return this.storefrontData;
    },
    balanceInEther() {
      return fromWei(this.storefront[STOREFRONT.BALANCE]);
    },
		ownedStorefront() {
      let owner = this.storefront[STOREFRONT.OWNER] ? this.storefront[STOREFRONT.OWNER].toUpperCase() : false;
			return this.currentAccount.toUpperCase() == owner
		}    
  },
  methods: {
    async deactiveStorefront() {
      await market.deactivateStorefront(this.storefrontId, this.currentAccount);
      refreshStorefront(this);
    },
    async renameStorefront() {
      await market.renameStorefront(
        this.storefrontId,
        this.storefrontNameInput,
        this.currentAccount
      );
      await refreshStorefront(this);
    },
    async createProduct() {
      await market.createProduct(
        this.storefrontId,
        this.productInput.name,
        toWei(this.productInput.price),
        this.productInput.quantity,
        this.currentAccount
      );
      refreshStorefront(this);
    },
    async withdrawFunds() {
      await market.withdrawStorefrontFunds(
        this.storefrontId,
        this.currentAccount
      );
      refreshStorefront(this);
    },
    refreshStorefront() {
      refreshStorefront(this);
    },
   refreshProducts() {
      refreshProducts(this);
    }    
  },
  async mounted() {
    await market.init();
    await refreshStorefront(this);
  }
};

async function refreshStorefront(_vm) {
  let storefront = await market.getStorefrontsById(_vm.storefrontId);
  _vm.storefrontData = storefront;
}

async function refreshProducts(_vm) {
  let storeSize = await market.getProductCountByStorefrontId(_vm.storefrontId);
  _vm.productsData = [];
  for (let i = 0; i < storeSize; i++) {
    let product = await market.getProduct(_vm.storefrontId, i);
    _vm.productsData.push(product);
  }
}
</script>

<style scoped>
	ul {
  	list-style: none;
	}
</style>