const wx = require('weixin-js-sdk')
import api from '@/api'
import { isIos } from '@/utils/index'
import cfg from '@/config'
console.log(window.location)
const wxInit=function(){
    return new Promise((resolve,reject)=>{
        //所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用，ios第一次注入就行
        if(isIos() && wx.readySucc){
            resolve()
            return
        }
        //配置权限验证
        api('home.jsapiSignature', {
            url: encodeURI(window.location.href.split('#')[0])
          }).then(res => {
            // console.log(res)
            wx.config({
              debug: false,
              appId: res.appId,
              timestamp: res.timestamp,
              nonceStr: res.nonceStr,
              signature: res.signature,
              jsApiList: [
                'getLocation', 'openLocation', 'updateAppMessageShareData'
              ]
            })
            wx.ready(_ => {
              wx.readySucc = true
              resolve()
              console.log('jssdk ready:', _)
            })
            wx.error(err => {
              reject()
              console.log('jssdk err:', err)
            })
          }).catch(err => {
            reject()
            console.log(err)
          })
    })
}

export{
    wx,
    wxInit
}