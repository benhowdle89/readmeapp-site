import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexPage from './../pages/'
import CallbackPage from './../pages/callback'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: IndexPage },
  { path: '/callback', component: CallbackPage }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
