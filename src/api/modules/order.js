import cfg from '@/config'
const baseURL = cfg.baseUrl
const infoURL = cfg.infoUrl
export default {
  // 获取订单列表
  orderList: {
    method: 'post',
    url: baseURL + 'order/getOrganizersOrderList'
  },
  // 取消订单
  cancelOrder: {
    method: 'get',
    url: baseURL + 'order/cancelOrder'
  },
  // 订单详情
  getOrderInfo: {
    method: 'get',
    url: baseURL + 'order/getOrderInfo'
  },
  // 订单统计
  countOrder: {
    method: 'get',
    url: baseURL + 'order/countOrder'
  }
}