import { vuexfireMutations } from 'vuexfire'
import firebase from '~/plugins/firebase'
import { auth } from '~/plugins/firebase.js'
import '@mdi/font/css/materialdesignicons.css' // この行を追加
//設定
export const state = () => ({
  login_user: null,
  user:{
    // uid:'',
    // email:'',
    // login:false,
  }
})
//stateして更新
export const mutations = {
  ...vuexfireMutations,
  //ログイン時の処理
  setLoginUser(state,user){
    console.log('userが入った?')
    state.login_user = user
    console.log('userが入った!')
  },
  //ログアウト時の処理、userをnullにする
  deleteLoginUser(state){
    state.login_user = null
  }
}
//commitして mutationsを更新
export const actions = {//mutationsと連携してコンポーネントからsetLoginUserを呼び出せばlogin_userを格納できる
  //googleでログインする（google認証プロバイダを利用する）
  googleLogin(){
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(google_auth_provider)
  },
  setLoginUser({ commit },user){
    commit('setLoginUser',user)
  },
  deleteLoginUser({ commit }){
    console.log('deleteLoginUser')
    commit('deleteLoginUser')
  },
  logOut(){
    console.log('ログアウトボタンが押されました')
    firebase.auth().signOut()//user削除した後のサインアウト処理
    this.$router.push('/')
  }
}

