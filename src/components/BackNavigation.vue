<template>
  <div class="nav-bar">
    <a href="#" class="go-back-btn" @click="goBack">Go Back</a>
    <div>{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'BackNavigation',
  props: {
    title: String
  },
  methods: {
		goBack () {
			window.history.length > 1
					? this.$router.go(-1)
					: this.$router.push('/');
		}       
  }
}
</script>
<style scoped>
.go-back-btn {
  color: white;
}
.nav-bar {
  margin-bottom: 20px;
}
</style>