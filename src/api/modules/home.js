import cfg from '@/config'
const baseURL = cfg.baseUrl
const infoURL = cfg.infoUrl
export default {
  // 获取微信签名信息
  jsapiSignature: {
    method: 'post',
    url: baseURL + 'wpp/jsapiSignature'
  },
}