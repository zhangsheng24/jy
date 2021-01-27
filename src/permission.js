import router from './router'
import {
  isWeiXin,
  isIos,
  GetQueryString
} from '@/utils/index'
import {
  wxInit
} from '@/utils/jssdkInit'
import {
  Notify
} from 'vant'
import {
  LsetItem,
  LgetItem,
  LreItem
} from '@/utils/storage'
import store from './store'
import {
  clearPending
} from '@/utils/padding'

router.beforeEach((to, from, next) => {
  clearPending()
  const url = decodeURI(window.location.href)
  if (url.indexOf('jwtToken') !== -1) {
    const jwtToken = GetQueryString('jwtToken')
    const avatar = GetQueryString('avatar')
    const name = GetQueryString('name')
    const phone = GetQueryString('phone')
    const userId = GetQueryString('userId')
    LsetItem('avatar', avatar)
    LsetItem('name', name)
    LsetItem('phone', phone)
    LsetItem('userId', userId)
    store.dispatch('user/setUserInfo', {
      avatar,
      name,
      phone,
      userId
    })
    if (jwtToken) {
      LsetItem('jwtToken', jwtToken)
      store.dispatch('user/setToken', jwtToken)
    }
  }
  
  if (from.path === '/' && isIos()) {
    wxInit()
  }
  const jwtToken = LgetItem('jwtToken')
  if (jwtToken) {
    // console.log('token存在')
    next()
  } else {
    Notify({
      type: 'danger',
      message: 'token不存在'
    })
  }
})

router.afterEach((to) => {
  document.title = to.query.setTitle || to.meta.title
})