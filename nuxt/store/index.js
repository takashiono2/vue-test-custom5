import { vuexfireMutations } from 'vuexfire'
import firebase from '~/plugins/firebase'
import { auth } from '~/plugins/firebase.js'
import '@mdi/font/css/materialdesignicons.css' // この行を追加
//設定
export const state = () => ({
  // login_user: '',
  user: {
    uid: '',
    mail: '',
    login: false,
  },
})
//stateして更新
export const mutations = {
  ...vuexfireMutations,
  //ログイン時の処理
  // setLoginUser(state,user){
  //   // console.log(state.login_user===null)
  //   state.login_user = user
  //   // console.log(state.login_user===null)
  // },
  //ログアウト時の処理、userをnullにする
  deleteLoginUser(state){
    state.user = null
  },
  //入ってきた、payloadオブジェクトを現在のstateオブジェクトに更新
  getData (state, payload) {
    state.user.uid = payload.uid
    state.user.email = payload.email
  },
  switchLogin (state) {
    state.user.login = true
   },
}
//commitして mutationsを更新
//参考https://firebase.google.cn/docs/auth/web/google-signin?hl=ja
export const actions = {
  // setLoginUser({ commit },user){
  //   commit('setLoginUser',user)
  // },
  deleteLoginUser({ commit }){
    console.log('deleteLoginUser')
    commit('deleteLoginUser')
  },
  logOut(){
    console.log('ログアウトボタンが押されました')
    firebase.auth().signOut()//user削除した後のサインアウト処理
    this.$router.push('/')
  },
//新規登録　dispatch('checkLogin')でactionsのcheckLogin（）を実行
  register ({ dispatch, commit }, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.mail, payload.password)
    .then(user => {
      console.log(user)
      dispatch('checkLogin')
    })
    .catch(function (error) {
      console.log({'code':error.code, 'message':error.message})
    })
   },
//新規登録後、googleLogin後、　commitでmutationsのgetDataとswitchLoginを実行
  checkLogin ({ commit }) {
    console.log('checkLogin!')
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('=== SIGNIN');
        commit('getData', { uid: user.uid, email: user.email })
        commit('switchLogin')//ログイン状態を確認するためのもの
      } else {
        this.deleteLoginUser()
        this.$router.push('/')
      }
    })
  },
//ログイン　https://firebase.google.com/docs/auth/web/start?hl=ja#web-version-8_1
  logIn(commit, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.mail, payload.password)
      .then(user => {
        console.log('成功！')
        firebase.auth().onAuthStateChanged(function (user) {
        console.log('ログイン時user.uid：'+user.uid)
          if (user) {
            commit('getData', { uid: user.uid, mail: user.mail })
            console.log('ログイン時'+user.uid,user.mail)
          }
        })
      })
      .catch((error) => {
          alert(error)
        })
  },
//   //名前,email認証
//   signUp({ commit }, { email, password }) {
//     return auth().createUserWithEmailAndPassword(email, password)
//   },
//   ////名前,email認証
//   signInWithEmail({ commit }, { email, password }) {
//     return auth().signInWithEmailAndPassword(email, password)
//   },
}
export const getters = {
  user: state => {
    console.log('ログイン時1：'+state.user)
    console.log('ログイン時2：'+state.login_user )
    console.log('ログイン時3：'+state.user.login)
    return state.user
  },
  loginUser(state){
    console.log('ログイン状態:' + state.user.login)
    return state.user.login
  }
}
//   userName: state => state.login_user ? state.login_user.displayName : '',
//   photoURL: state => state.login_user ? state.login_user.photoURL : ''
// }
