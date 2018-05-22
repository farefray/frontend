import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    errorLog,
    tagsView,
    permission
  },
  plugins: [
    createPersistedState({
      paths: [
        'app', 'permission', 'user'
      ]
    })
  ],
  getters
})

export default store
