<template>
  <div>
    <a href="#" @click="goBack">Go Back</a>
  </div>
</template>

<script>
export default {
  name: 'BackNavigation',
  methods: {
		goBack () {
			window.history.length > 1
					? this.$router.go(-1)
					: this.$router.push('/');
		}       
  }
}
</script>