import Vue from 'vue'
import ElementUI from 'element-ui'
import elementLocale from 'element-ui/lib/locale/lang/en'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'

import './styles/index.scss'
import 'vue-awesome/icons' // maybe not needed?

import './errorLog'
import './permission'
import './mock'
import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)
Vue.use(require('vue-moment'))
Vue.use(ElementUI, { locale: elementLocale })
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
    const self = this;
    self.$store.dispatch('VerifyToken').catch(function(e) {
        // Функция не перевыбросила исключение 'e'
        // в результате произойдёт resolve(undefined)
        // для Promise, возвращённого функцией catch
        console.log(e);
    }).then((response) => {
      console.log('Login token verified!')
      console.log(response);
      console.log('Building routes')
      const roles = self.$store.getters.roles
      console.log(self.$store.getters.roles)
      self.$store.dispatch('GenerateRoutes', { roles }).then((routers) => {
        console.log(routers);
        router.addRoutes(self.$store.getters.addRouters)
      })
    });
  },
  components: { App }
})
