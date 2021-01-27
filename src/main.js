import Vue from 'vue'
import App from './App.vue'
import Vant, { Lazyload } from 'vant'
import store from './store'
import router from './router'
import 'amfe-flexible'
import 'vant/lib/index.css'
import './commons/css/common.scss'
import './permission'
import * as filters from './filter'
import wx from 'weixin-js-sdk'
import cfg from '@/config'

Vue.config.productionTip = false
// 定义全局时间戳过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

if (cfg.type === 'development' || cfg.type === 'test') {
  require('eruda').init()
}

Vue.use(Vant)
Vue.use(wx)
Vue.use(Lazyload)

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
