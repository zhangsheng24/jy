import cfg from '@/config'
const baseURL = cfg.baseUrl
const infoURL = cfg.infoUrl
export default {
  // 获取公司列表
  companyList: {
    method: 'get',
    url: baseURL + 'company/getUserCompanies'
  },

  // 修改用户当前公司
  updateCompany: {
    method: 'post',
    url: baseURL + 'company/changeUserCompany'
  },

  // 获取所有列表
  getActivityList: {
    method: 'get',
    url: baseURL + 'activity/list'
  },

  // 根据类型获取列表
  getActivityListByType: {
    method: 'get',
    url: baseURL + 'activity/listByType'
  },

  // 获取所有分类总量
  getSummary: {
    method: 'get',
    url: baseURL + 'activity/getSummary'
  },

  // 根据类型获取活动分类总量
  getSummaryByType: {
    method: 'get',
    url: baseURL + 'activity/getSummaryByType'
  },

  // 活动详细信息
  getActivityInfo: {
    method: 'get',
    url: baseURL + 'activity/info'
  },

  // 获取活动统计
  getActivitySummary: {
    method: 'get',
    url: baseURL + 'activityTools/getActivitySummary'
  },

  // 刷新token 
  updateToken: {
    method: 'post',
    url: infoURL + 'user/refreshToken'
  },
  // 获取账户余额
  getUserBalance: {
    method: 'get',
    url: baseURL + 'wallet/getUserBalance'
  },
  // 获取短信余额
  getBalance: {
    method: 'get',
    url: baseURL + 'notify/getBalance'
  }
}