import cfg from '@/config'
const baseURL = cfg.baseUrl
const infoURL = cfg.infoUrl
export default {
    getOptions: {
        method: 'get',
        url: baseURL + 'organizer/options'
    },
    create:{
        method: 'post',
        url: baseURL + 'organizer/create'
    }
}