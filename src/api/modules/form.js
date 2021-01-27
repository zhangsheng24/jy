import cfg from '@/config'
const baseURL = cfg.baseUrl
const infoURL = cfg.infoUrl
export default {
    //创建表单
    create: {
        method: 'post',
        url: baseURL + "signUp/setTicketTemplateForm"
    },
    // 获取购票通知
    getTicketAdvancedConfig: {
        method: 'get',
        url: baseURL + 'signUp/getTicketAdvancedConfig'
    },
    // 设置购票通知
    setTicketAdvancedConfig: {
        method: 'post',
        url: baseURL + 'signUp/setTicketAdvancedConfig'
    },
    // 获取自定义项
    getCustomizeOptions: {
        method: 'get',
        url: baseURL + 'form/getCustomizeOptions'
    },
    //禁用门票
    forbidden: {
        method: 'post',
        url: baseURL + 'ticket/setSale'
    },

}