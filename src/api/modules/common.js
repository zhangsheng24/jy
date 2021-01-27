import cfg from '@/config'
const baseURL = cfg.baseUrl
const infoURL = cfg.infoUrl
export default {
    //获取图片上传
    upload: {
        url: infoURL + 'officialWebsiteDesign/getUploadToken',
        method: 'get'
    },
    //获取常用项
    commonOptions: {
        url: baseURL + 'form/getCommonOptions',
        method: 'get'
    }
}