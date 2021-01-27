import cfg from '@/config'
const baseURL = cfg.baseUrl
const infoURL = cfg.infoUrl
export default {
    //创建
    create: {
        method: 'post',
        url: baseURL + 'activity/create'
    },
    //编辑
    edit: {
        method: 'post',
        url: baseURL + 'activity/edit'
    },
    //创建活动模板
    createFromTemplate: {
        method: 'post',
        url: baseURL + 'activityOrganizer/createFromTemplate'
    },
    // 活动信息
    info: {
        method: 'get',
        url: baseURL + 'activity/info'
    },
    //发布活动
    publish: {
        method: 'post',
        url: baseURL + 'openPlatform/activityRelease'
    },
    cancelPublish: {
        method: 'post',
        url: baseURL + 'openPlatform/cancelActivityRelease'
    },
    // 获取微官网全部信息
    infoForEdit: {
        method: 'get',
        url: baseURL + 'officialWebsiteDesign/infoForEdit'
    },
    // 获取活动二维码
    getActivityQrCode: {
        method: 'get',
        url: baseURL + 'openPlatform/getActivityQrCode'
    },
    //切换门票模式
    switchTicketMode: {
        method: 'post',
        url: baseURL + 'activity/switchTicketMode'
    },
    // 获取活动组织的详细信息
    getActivityOrganizationInfo: {
        method: 'post',
        url: baseURL + 'activityOrganizer/getActivityOrganizationInfo'
    },
}