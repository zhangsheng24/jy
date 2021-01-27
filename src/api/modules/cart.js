import cfg from '@/config'
const baseURL = cfg.baseUrl
const infoURL = cfg.infoUrl
export default {
    //加入购物车项
    addItem: {
        method: 'post',
        url: baseURL + "shoppingCart/addItem"
    },
    //清空对应活动下的购物车
    clearCart: {
        method: 'post',
        url: baseURL + "shoppingCart/clearCart"
    },
    //统计当前活动购物车数量
    countCardItemByUserIdAndActivityId: {
        method: 'post',
        url: baseURL + "shoppingCart/countCardItemByUserIdAndActivityId"
    },
    //删除对应购物项
    delItemById: {
        method: 'post',
        url: baseURL + "shoppingCart/delItemById"
    },
    //列出对应活动下的购物车
    listAll: {
        method: 'post',
        url: baseURL + "shoppingCart/listAll"
    },
    //更新对应购物项的数量
    updateItemAmount: {
        method: 'post',
        url: baseURL + "shoppingCart/updateItemAmount"
    },
}