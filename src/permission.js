import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles || !permissionRoles.length) return true
  console.log('has Permission')
  console.log(roles, permissionRoles);
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// no redirect whitelist (todo it read from router?)
// TODO!! critical issue. When f.e. events/index isnt listed here, but user gets into this menu, it somehow freezes whole tab and lags out 4ever
const whiteList = [
  '/login',
  '/authredirect',
  '/introduction/index',
  '/dashboard/index',
  '/dashboard',
  '/events/index',
  '/events'
];

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // Determine whether the current user has pulled the user_info information
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // Generate an accessible routing table based on the permissions of the roles
            router.addRoutes(store.getters.addRouters) // Dynamically add accessible routing tables
            next({ ...to, replace: true }) // The hack method ensures addRoutes is done ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('Verification failed, please login again')
            next({ path: '/login' })
          })
        })
      } else {
        // There is no need to dynamically change the permissions can be directly next () Delete the following permissions to determine ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // Can be deleted ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // In the login whitelist, direct access
      next()
    } else {
      next('/login') // Otherwise all redirect to the login page
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
