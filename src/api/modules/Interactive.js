import cfg from '@/config'
const baseURL = cfg.baseUrl
const infoURL = cfg.infoUrl
export default {
    //互动类型
    getCategories: {
        method: 'post',
        url: baseURL + "interactive/getCategories"
    },
    //创建互动
    create: {
        method: 'post',
        url: baseURL + "interactive/create"
    },
    //更新互动
    update: {
        method: 'post',
        url: baseURL + 'interactive/update'
    },
    //查询可购买的游戏产品列表
    findGameList:{
        method: 'post',
        url: baseURL + 'feature/findGameList'
    },
    //查询已购买的产品列表
    getBoughtFeatures:{
        method: 'post',
        url: baseURL + 'feature/getBoughtFeatures'
    }, 
     //获取游戏详情信息
     getGameInfo:{
        method: 'get',
        url: baseURL + 'game/getGameInfo'
    }, 
}