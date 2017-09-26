import { param2Obj } from '@/utils'

export default {
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return Promise.reject('error')
    }
  }
}
