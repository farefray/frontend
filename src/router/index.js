import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
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
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { roles: [], title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component',
      roles: ['admin']
    },
    children: [
      { path: 'tinymce', component: _import('components/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'json-editor', component: _import('components/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'dnd-list', component: _import('components/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'splitpane', component: _import('components/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: _import('components/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: _import('components/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: _import('components/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: _import('components/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'back-to-top', component: _import('components/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
    ]
  },
  {
    path: '/stats',
    component: Layout,
    redirect: 'noredirect',
    name: 'My statistic',
    meta: {
      title: 'My statistic',
      icon: 'chart'
    },
    children: [
      { path: 'dashboard', component: _import('stats/dashboard'), meta: { title: 'Dashboard', noCache: true }},
      { path: 'table', component: _import('stats/predictions'), meta: { title: 'Predictions', noCache: true }}
    ]
  },
  {
    path: '/predictions',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('predictions/index'), name: 'Events', meta: { title: 'Events', icon: 'table' }}]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: { roles: ['admin'], title: "Error pages", icon: '404' },
    children: [
      { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },
  {
    path: '/i18n',
    component: Layout,
    children: [{ path: 'index', component: _import('i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('introduction/index'), name: 'About us', meta: { title: 'About us', icon: 'wechat' }}]
  },
  { path: '*', redirect: '/404', hidden: true }
]
