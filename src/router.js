import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/Settings.vue'
import Storefront from './views/Storefront.vue'
import Product from './views/Product.vue'
import Orders from './views/Orders.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/settings',
      name: 'settings',
      component: About
    },
    {
      path: '/storefront/:id',
      name: 'storefront',
      component: Storefront
    },
    {
      path: '/storefront/:sid/product/:pid',
      name: 'product',
      component: Product
    },
    {
      path: '/orders',
      name: 'order',
      component: Orders
    }               
  ]
})
