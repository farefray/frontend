import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will no redirct in the levelbar
* noDropdown : if `noDropdown:true` will has no submenu
* meta : { role: ['admin'] }  will control the page role
**/
export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    icon: 'dashboard',
    noDropdown: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index'), name: 'Dashboard' }]
  }
]

export default new Router({
  mode: 'history', // hash mode by default if any issues with webserver https://router.vuejs.org/ru/essentials/history-mode.html
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: 'permission',
    meta: { role: ['admin'] },
    noDropdown: true,
    children: [{ path: 'index', component: _import('permission/index'), name: 'permission', meta: { role: ['admin'] }}]
  },
  {
    path: '/icon',
    component: Layout,
    noDropdown: true,
    meta: { role: ['admin'] },
    children: [{ path: 'index', component: _import('svg-icons/index'), name: 'icons' }]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    name: 'components',
    meta: { role: ['admin'] },
    children: [
      { path: 'index', component: _import('components/index'), name: '介绍 ' },
      { path: 'tinymce', component: _import('components/tinymce'), name: '富文本编辑器' },
      { path: 'markdown', component: _import('components/markdown'), name: 'Markdown' },
      { path: 'jsoneditor', component: _import('components/jsonEditor'), name: 'JSON编辑器' },
      { path: 'dndlist', component: _import('components/dndList'), name: '列表拖拽' },
      { path: 'splitpane', component: _import('components/splitpane'), name: 'SplitPane' },
      { path: 'avatarupload', component: _import('components/avatarUpload'), name: '头像上传' },
      { path: 'dropzone', component: _import('components/dropzone'), name: 'Dropzone' },
      { path: 'sticky', component: _import('components/sticky'), name: 'Sticky' },
      { path: 'countto', component: _import('components/countTo'), name: 'CountTo' },
      { path: 'mixin', component: _import('components/mixin'), name: '小组件' },
      { path: 'backtotop', component: _import('components/backToTop'), name: '返回顶部' }
    ]
  },
  {
    path: '/stats',
    component: Layout,
    redirect: 'noredirect',
    name: 'My statistic',
    meta: {},
    children: [
      { path: 'dashboard', component: _import('stats/dashboard'), name: 'Dashboard' },
      { path: 'table', component: _import('stats/predictions'), name: 'Predictions' }
    ]
  },
  {
    path: '/predictions',
    component: Layout,
    redirect: 'noredirect',
    name: 'Predictions',
    children: [
      {
        path: 'events',
        component: _import('predictions/events'),
        name: 'Events'
        /* children: [
          { path: 'table', component: _import('predictions/events'), name: 'composite table' },
          { path: 'dynamictable', component: _import('predictions/table/dynamictable/index'), name: 'dynamic table' },
          { path: 'dragtable', component: _import('predictions/table/dragTable'), name: 'drag table' },
          { path: 'inline_edit_table', component: _import('predictions/table/inlineEditTable'), name: 'inline edit' },
        ] */
      },
      { path: 'form/edit', meta: { role: ['admin'], isEdit: true }, component: _import('predictions/form'), name: '编辑Form' },
      { path: 'form/create', meta: { role: ['admin'] }, component: _import('predictions/form'), name: '创建Form' },
      { path: 'tab/index', meta: { role: ['admin'] }, component: _import('predictions/tab/index'), name: 'Tab' }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    meta: { role: ['admin'] },
    name: 'error',
    children: [
      { path: '401', component: _import('errorPage/401'), name: '401' },
      { path: '404', component: _import('errorPage/404'), name: '404' }
    ]
  },
  {
    path: '/errlog',
    component: Layout,
    redirect: 'noredirect',
    name: 'errlog',
    noDropdown: true,
    meta: { role: ['admin'] },
    children: [{ path: 'log', component: _import('errlog/index'), name: '错误日志' }]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/download',
    name: 'excel',
    meta: { role: ['admin'] },
    children: [
      { path: 'download', component: _import('excel/index'), name: '导出excel' },
      { path: 'download2', component: _import('excel/selectExcel'), name: '导出已选择项' }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    name: 'theme',
    noDropdown: true,
    meta: { role: ['admin'] },
    children: [{ path: 'index', component: _import('theme/index'), name: '换肤' }]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    noDropdown: true,
    children: [{ path: 'index', component: _import('introduction/index'), name: 'About us' }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
