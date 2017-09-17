import Mock from 'mockjs'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'

Mock.setup({
  timeout: '350-600'
})

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

export default Mock
