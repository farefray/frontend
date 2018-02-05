import Vue from 'vue';
import Buefy from 'buefy';
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control

import * as filters from './filters' // global filters

Vue.use(Buefy);
Vue.use(require('vue-moment')); // Is really needed? Too big...

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false // ???

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  beforeCreate() {
    const self = this
    self.$store.dispatch('VerifyToken').catch(function(e) {
      // Функция не перевыбросила исключение 'e'
      // в результате произойдёт resolve(undefined)
      // для Promise, возвращённого функцией catch
      console.log(e)
    }).then((response) => {
      console.log('Login token verified!')
      console.log(response)
      console.log('Building routes')
      const roles = self.$store.getters.roles
      console.log(self.$store.getters.roles)
      self.$store.dispatch('GenerateRoutes', { roles }).then((routers) => {
        console.log(routers)
        router.addRoutes(self.$store.getters.addRouters)
      })
    });
  },
  components: { App }
})
