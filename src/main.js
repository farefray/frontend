import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import './styles/index.scss'
// only import the icons you use to reduce bundle size
// import 'vue-awesome/icons/flag'
// or import all icons if you don't care about bundle size
import 'vue-awesome/icons' // maybe not needed?

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
  beforeCreate() {
    this.$store.dispatch('VerifyToken').then(() => {
      console.log('Login token verified!')

      console.log('Building routes')
      const roles = this.$store.getters.roles
      console.log(this.$store.getters.roles)
      this.$store.dispatch('GenerateRoutes', { roles }).then(() => {
        router.addRoutes(this.$store.getters.addRouters)
      })
    })
  },
  components: { App }
})
