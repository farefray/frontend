import Mock from 'mockjs'
import remoteSearchAPI from './remoteSearch'

Mock.setup({
  timeout: '350-600'
})

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

export default Mock
