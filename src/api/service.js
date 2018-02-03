import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

service.interceptors.response.use((response) => {
  console.log('axios, valid response')
  return response
}, function(error) {
  console.log('axios, error');
  // Do something with response error
  if (error.response.status === 401) {
    console.log('unauthorized, logging out ...')
  }
  return Promise.reject(error.response)
})

export default service
