import { vuexfireMutations } from 'vuexfire'
import { auth } from '~/plugins/firebase.js'
import '@mdi/font/css/materialdesignicons.css' // この行を追加

export const state = () => ({
  login_user: null,
})

export const mutations = {
  ...vuexfireMutations,
  setLoginUser(state,user){
    state.login_user = user
  },
}

export const actions = {//mutationsと連携してコンポーネントからsetLoginUserを呼び出せばlogin_userを格納できる
  setLoginUser({ commit },user){
    commit('setLoginUser',user)
  }
}
