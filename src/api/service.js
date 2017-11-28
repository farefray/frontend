import axios from 'axios'
import { getToken } from '@/utils/auth'

const service = axios.create({
  headers: {
    csrf: 'token',
    auth: getToken()
  },
  baseURL: process.env.BASE_API,
  timeout: 5000
})

export default service
