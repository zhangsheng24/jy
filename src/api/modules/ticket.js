import cfg from '@/config'
const baseURL = cfg.baseUrl
const infoURL = cfg.infoUrl
export default {
    list: {
        method: 'get',
        url: baseURL + 'ticket/list'
    },
    //获取门票表单模板
    tempForm: {
        method: 'get',
        url: baseURL + 'signUp/getTicketTemplateForm'
    },
    // 门票编辑/新增（ticketId传0）
    edit: {
        method: 'post',
        url: baseURL + 'signUp/setOneTicketTemplateForm'
    },
    delete: {
        method: 'post',
        url: baseURL + 'ticket/delete'
    }
}