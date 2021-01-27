import { LgetItem, LsetItem } from '@/utils/storage'
const user = {
  state: {
    companyInfo: LgetItem('companyInfo') || {},
    jwtToken:LgetItem('jwtToken'),
    userInfo:LgetItem('userInfo') || {},
    isTips: LgetItem('isTips') == null ? true : LgetItem('isTips')
  },

  mutations: {
    SET_companyInfo: (state, companyInfo) => {
      LsetItem('companyInfo', companyInfo)
      state.companyInfo = companyInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      LsetItem('jwtToken', token)
    },
    SET_USERINFO:(state,userInfo)=>{
      LsetItem('userInfo', userInfo)
      state.userInfo = userInfo
    },
    SET_isTips:(state,isTips)=>{
      LsetItem('isTips', isTips)
      state.isTips = isTips
    }  
  },

  actions: {
    setToken({commit},token){
      commit('SET_TOKEN', token)
    },
    setUserInfo({commit},userInfo){
      commit('SET_USERINFO',userInfo)
    }
  }
  //user/func
}


export default user
