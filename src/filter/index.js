import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear'
import 'dayjs/locale/zh-cn'

dayjs.extend(isLeapYear) // use plugin
dayjs.locale('zh-cn') // use locale

export const formatDate = (time, format) => {
  if (!time) {
    return '-'
  }
  return dayjs.unix(time).format(format || 'YYYY-MM-DD HH:mm:ss')
}

export const formatPhone = (phone) => {
  if (!phone) {
    return '-'
  }
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
}