import service from './service'

export function fetchEventsList(params) {
  console.log(params)
  return service.get('/api/v1/events', {

  }).then(response => {
    console.log(response);
    if (!response || !response.data) {
      return false
    }

    let eventList = response.data;
    let List = [];
    for (let i = 0; i < params.limit; i++) {
      List.push({
        id: 123,
        timestamp: 12321312312321,
        author: '@cname',
        auditor: '@cname',
        title: '@ctitle',
        forecast: 2.22,
        importance: 1,
        type: 'EU',
        status: 'draft',
        display_time: 132141241241,
        pageviews: 2323
      })
    }

    console.log(eventList);
    const pageList = List.filter((item, index) => index < params.limit * params.page && index >= params.limit * (params.page - 1))
    console.log(pageList);
    return {
      total: List.length,
      items: List
    }
  })
}

// TODO \/
export function fetchList(params) {
  console.log(params)
  return service.get('/api/v1/events', {

  }).then(response => {
    return response
  })
}

export function fetchPv(params) {
  console.log(params)
  return service.get('/api/v1/events', {

  }).then(response => {
    return response
  })
}

export function fetchArticle(params) {
  console.log(params)

  return service.get('/api/v1/events', {
  }).then(response => {
    return response
  })
}

/*
 getList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC网站', pv: 1024 }, { key: 'mobile网站', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),

 getArticle: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: false,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: ''
  })
 */