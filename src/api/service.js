import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  validateStatus: function(status) {
    return status >= 200 && status < 500; // default
  }
})

export default service
