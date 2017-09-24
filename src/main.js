import Vue from 'vue'
import '../theme/index.css'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters'
// only import the icons you use to reduce bundle size
// import 'vue-awesome/icons/flag'
// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'

import './errorLog'
import './permission'
import './mock'
import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)
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
