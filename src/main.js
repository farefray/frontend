import Vue from 'vue'
import '../theme/index.css'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters'
import './icons'
import './errorLog'
import './permission'
import './mock'

Vue.use(ElementUI)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false // ???

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
