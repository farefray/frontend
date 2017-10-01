import { registerUser, loginByUsername, verifyToken } from '@/api/apiuser'
import { getToken, setToken, removeToken } from '@/utils/auth'
const log = require('bows')('Store User')

const defaultState = {
  id: '',
  username: '',
  email: '',
  status: '',
  code: '',
  token: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: ['guest'],
  setting: {
    articlePlatform: []
  }
};

const user = {
  state: {
    id: '',
    username: '',
    email: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: ['guest'],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    RESET_USER: (state) => {
      for (let prop in defaultState) { // prefer-const
        state[prop] = defaultState[prop];
      }
      removeToken();
    }
  },

  actions: {
    VerifyToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        const cookieToken = getToken();
        if (cookieToken !== state.token || state.token === '' || state.token === undefined) {
          commit('RESET_USER');
          return reject()
        }

        // token exist, confirm it by backend
        return new Promise((rresolve, rreject) => {
          verifyToken(cookieToken, state.id, state.email).then(response => {
            if (response === true) {
              return resolve()
            }

            commit('RESET_USER');
            return reject()
          })
        })
      })
    },
    RegisterUser({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        registerUser(userInfo).then(response => {
          if (response === false) {
            // incase error proc on request
            return reject()
          }

          return resolve()
        }).catch(error => {
          return reject(error)
        })
      })
    },

    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          if (response === false) {
            // incase error proc on request
            return reject()
          }

          log(response)

          const data = response.data
          setToken(response.data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_EMAIL', data.email)
          commit('SET_ID', data.id)
          commit('SET_USERNAME', data.username)
          commit('SET_ROLES', data.roles)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        resolve(state)
      })
    },

    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('RESET_USER');
        resolve()
        location.reload()
      })
    },

    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        resolve()
      })
    }
  }
}

export default user
