import cfg from '@/config'
const baseURL = cfg.baseUrl
const infoURL = cfg.infoUrl
export default {
    balance: {
        url: baseURL + 'notify/getBalance',
        method: 'get'
    }
}