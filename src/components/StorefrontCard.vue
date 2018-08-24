<template>
		<div class="card" @click="goToStorefront"> 
		<div><label>Id</label> {{storefront[STOREFRONT.STOREFRONT_ID]}} </div>
			<div><label>Owner</label> {{storefront[STOREFRONT.OWNER]}} </div>
			<div> <label>Name</label> {{storefront[STOREFRONT.NAME]}} </div>
			<div> <label>Active</label> {{storefront[STOREFRONT.IS_ACTIVE]}} </div>
		</div>
</template>

<script>
import { STOREFRONT } from "../constants";

export default {
  name: "StorefrontCard",
  props: {
    storefront: Array
  },
  data() {
    return {
      STOREFRONT
    };
  },
  methods: {
    goToStorefront() {
      this.$router.push({
        path: `storefront/${this.storefront[STOREFRONT.STOREFRONT_ID]}`
      });
    }
  }
};
</script>