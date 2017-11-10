import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'basscss/css/basscss.css'
import App from './App.vue'
import store from './store'
import router from './router'
import VueYouTubeEmbed from 'vue-youtube-embed'
import vueSmoothScroll from 'vue-smoothscroll'

Vue.use(vueSmoothScroll)
Vue.use(VueYouTubeEmbed)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
