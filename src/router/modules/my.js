export default [{
  path: '/my/myActivities',
  name: 'myActivities',
  component: () => import('@/views/my/myActivities.vue'),
  meta: {
    title: '我的活动',
    navIndex: 0
  }
},
{
  path: '/my/order',
  name: 'order',
  component: () => import('@/views/my/order/index.vue'),
  meta: {
    title: '我的订单'
  }
},
{
  path: '/my/order/orderDetails',
  name: 'orderDetails',
  component: () => import('@/views/my/order/orderDetails.vue'),
  meta: {
    title: '订单详情'
  }
}]