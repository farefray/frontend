import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000                  // 请求超时时间
})

export function loginByUsername(uname, pass) {
  return service.post('/auth/local', {
    username: uname,
    password: pass
  })
    .then(response => {
      console.log(response)
      return response
    })
    .catch(error => {
      // validation rules failed response.data.data.name == ValidationError
      // let errorMessage = error;
      Message({
        message: error.response.data.error.message,
        type: 'error',
        duration: 5 * 1000
      })

      return false
    })
}

export function registerUser(userInfo) {
  return service.post('/signup', userInfo)
    .then(response => {
      console.log(response)
      return response
    })
    .catch(error => {
      // validation rules failed response.data.data.name == ValidationError
      let errorMessage = '';

      // some validation rules failed when saving user
      if (error.response.data.data && error.response.data.data._message) {
        errorMessage = error.response.data.data._message + ': '
        Object.keys(error.response.data.data.errors).forEach(function(key, index) {
          // key: the name of the object key
          // index: the ordinal position of the key within the object
          if (index > 0) {
            errorMessage += ', '
          }

          errorMessage += error.response.data.data.errors[key].message
        });
      } else {
        // User or email exist
        errorMessage = error.response.data.error.message
      }

      Message({
        message: errorMessage,
        type: 'error',
        duration: 5 * 1000
      })

      return false
    })
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

