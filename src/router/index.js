import Vue from 'vue'
import VueRouter from 'vue-router'
import page from './page'
import cfg from '@/config'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const files = require.context('./modules', false, /\.js$/)
const routes = []
files.keys().forEach(key => {
  routes.push(...files(key).default)
})

const Router = new VueRouter({
  mode: 'history',
  base: cfg.routerBase,
  fallback: false,
  scrollBehavior(to, from, savedPosition) {
    // keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition
    }
    // 异步滚动操作
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 1 })
      }, 0)
    });
  },
  routes
})

Router.addRoutes([...page])

export default Router
