import axios from 'axios'
import { Notify,Toast } from 'vant'
import cfg from '@/config'
import { addPending, removePending } from '@/utils/padding'
import { LreItem, LgetItem } from '@/utils/storage'
import statusCode from '@/config/statusCode'

// axios.defaults.baseURL = `${cfg.host}${cfg.port}${cfg.baseUrl}`
axios.defaults.baseURL=''
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.timeout = 20000
axios.defaults.withCredentials = true
let ajaxTimes=0

axios.interceptors.request.use(
  config => {
    ajaxTimes++
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration:0
    });
    if (config.headers['noHeader']) {
      delete config.headers
    } else {
      LgetItem('jwtToken') && (config.headers['token'] = LgetItem('jwtToken'))
    }
    removePending(config, false)
    addPending(config)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(res => {
  ajaxTimes-- 
  if(ajaxTimes === 0){
    Toast.clear()
  }
  const data = res.data;
  const status = res.status;
  removePending(res.config, true)
  // 响应拦截
  if (status == 200) {
    if (data) {
      const serveCode = data.code;
      if (serveCode !== 1) {
        if (statusCode[serveCode]) {
          Notify({ type: 'danger', message: statusCode[serveCode] })
          // // token过期处理
          // if (serveCode == 30006 || serveCode == 30007) {
          //   setTimeout(() => {
          //     router.replace("/login");
          //   }, 1000);
          // } else if (serveCode == 3) {
          //   // 版本更新
          //   const version = data.version;
          //   window.reload();
          // }
        } else {
          Notify({ type: 'danger', message:"出了一点问题" })
        }

        return Promise.reject(data);
      } else {
        return data.data;
      }
    } else {
      return res;
    }
  } else {
    Notify({ type: 'danger', message:"网络连接失败" })
    return Promise.reject(data);
  }
      
}, err => {
  ajaxTimes-- 
  if(ajaxTimes === 0){
    Toast.clear()
  }
  err.config && removePending(err.config, true)
  let message = '请求出错，请稍后重试！'
  if (err.message.includes('timeout')) {
    message = '请求超时'
  } else if (err.response) {
    message = err.response.data.message
    switch (err.response.status) {
      case 404:
        message = 'Not Found'
        break
      case 400:
        message = err.response.data.error
        break
      default:
        message = "请求出错，请稍后重试！"
      break
    }
  } else if (err.__CANCEL__) {
    message = '请求取消'
  }
  console.log(message)
  Notify({ type: 'danger', message: message })
  return Promise.reject(err && err.response ? err.response.data : { message, cancel: !!err.__CANCEL__ })
})

export default function (options) {
  
  
  let params = {
    method: options.method,
    url: options.url,
    data: options.params,
    requestMessage: true,
    requestSame: 'throttle',
    ...options.other
  }
  if (params.method.toLowerCase() === 'get') {
    params.params = params.data
    delete params.data
  }
  return axios(params)
}