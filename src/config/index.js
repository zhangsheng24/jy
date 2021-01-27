// 配置编译环境和线上环境之间的切换
const env = process.env

let config = {
  host: "",
  port: "",
  baseUrl: "",
  infoUrl:"",
  webRouterIntercept: true, // 登录拦截
  type: env.VUE_APP_TITLE,
  redirect: '',
  shareLink:'',
  isLogining: true,
  localRedirect: '',
  version: env.VUE_APP_VERSION,  // 版本号
  routerBase: env.BASE_URL // VueRouter base，同nginx配置
}


if (config.type === 'development') {
  // config.baseUrl = "http://192.168.148.174:8083/"
  // config.infoUrl = "http://192.168.148.174:8080/"
  config.baseUrl = '/dev/api/'
  config.infoUrl='/dev/infoApi/'
  // config.port = ':8083'
  // config.baseUrl='/dev/api'
  // config.host = 'http://192.168.148.174'
  // config.host = 'https://jyhdmeetingh5.jingyuhuodong.com'
} else if (config.type === 'production') {
  config.baseUrl = ''
  config.host = ''
} else if (config.type === 'test') {
  config.host = ''
  config.baseUrl = '/test/api/'
  config.infoUrl='/test/infoApi/'
}
export default config