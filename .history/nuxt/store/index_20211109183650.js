import { vuexfireMutations } from 'vuexfire'
// import firebase from '~/plugins/firebase'
import firebase from '../plugins/firebase'
// import { auth } from '/plugins/firebase.js'
import '@mdi/font/css/materialdesignicons.css' // この行を追加
//設定

export const state = () => ({
  login_user: null,
  addresses:[],
  userUid: '',
  loggedIn: false,
  photoURL:'',
  displayName:''
  // user: {
  //   uid: '',
  //   email: '',
  //   // login: false,
  //   login: null
  // },
})
//stateして更新
export const mutations = {
  ...vuexfireMutations,
  //アドレス追加時
  addAddress(state,address){
    state.addresses.push(address)
  },

  //ログイン時の処理
  setLoginUser(state,user){
    // console.log(state.login_user===null)
    // state.login_user = user
    state.login_user = user
    // console.log(state.login_user===null)
  },
  //ログアウト時の処理、userをnullにする
  deleteLoginUser(state){
    // state.user = null
    state.login_user  = null
  },
 　// 認証状態を双方向に変化
  loginStatusChange(state, status) {
    state.loggedIn = status
  },
  // user_uidの取得
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setDisplayName(state, displayName) {
    state.displayName = displayName
  },
  setPhotoURL(state,photoURL) {
    state.photoURL = photoURL
  },

  //入ってきた、payloadオブジェクトを現在のstateオブジェクトに更新
  // getData (state, payload) {
  //   state.user.uid = payload.uid
  //   state.user.email = payload.email
    // console.log('getDateのuid:'+payload.uid)
    // console.log('getDateのemail:'+payload.email)
    // console.log('getDateのstateuid:'+state.user.uid)
    // console.log('getDateのstateemail:'+state.user.email)
  // },
  // switchLogin (state,payload) {
  //   // console.log('state.user.login前は'+state.user.login)
  //   state.user.login = payload
  //   console.log('state.user.login後は'+state.user.login)
  //  },
}
//commitして mutationsを更新
//参考https://firebase.google.cn/docs/auth/web/google-signin?hl=ja
export const actions = {
  addAddress({ getters,commit },address){
    console.log(getters.uid)
    // console.log('getters.uid：'+getters.uid)　//getters.uidがnullになるのはなぜ？
    if(getters.uid){
      firebase.firestore().collection(`users/{$getters.uid}/addresses`).add(address).then(doc=>{
        commit('addAddress',address)
      })
    }
  },
  setLoginUser({ commit },user){
    commit('setLoginUser',user)
  },
  deleteLoginUser({ commit }){
    console.log('deleteLoginUser')
    commit('deleteLoginUser')
  },
//googleでログイン
  googleLogin(){
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    // firebase.auth().signInWithRedirect(google_auth_provider)
    firebase.auth().signInWithPopup(google_auth_provider).then(function(result) {
      const user = result.user;
      commit('loginStateChange', true)
      console.log('Login was successful')
      commit('setUserUid', user.uid)
      commit('setDisplayName', user.displayName)
      commit('setPhotoURL', user.photoURL)
      this.$router.push('/todos')
    }).catch(function(error) {
      var errorCode = error.code;
      console.log('error : ' + errorCode)
    });
  },
    // 認証状態の取得をするaction
  onAuth({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {}
      commit('setUserUid', user.uid)
      commit('setDisplayName', user.displayName)//追加
      commit('setPhotoURL', user.photoURL)//追加
      commit('loginStatusChange', user.uid ? true : false)
    })
  },
  logOut(){
    console.log('ログアウトボタンが押されました')
    firebase.auth().signOut()//user削除した後のサインアウト処理
    this.$router.push('/')
  },
//新規登録　dispatch('checkLogin')でactionsのcheckLogin（）を実行
  signUp ({ dispatch, commit }, payload) {
    if(getters.uid)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        console.log(user)
        // dispatch('checkLogin')
        commit('getData', { uid: user.uid, email: user.email })
      })
      .catch(function (error) {
        console.log({'code':error.code, 'message':error.message})
      })
   },
//ログイン　https://firebase.google.com/docs/auth/web/start?hl=ja#web-version-8_1
  logIn({ commit, dispatch }, payload) {//mail->id,password→uid
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        console.log('成功！')
        console.log('ログイン時'+user)
        // commit('switchLogin', true);
        dispatch('checkLogin')
        // console.log('成功！'+user.uid,)
        // commit('getData', { uid: user.uid, email: payload.email })
      })
      .catch((error) => {
          alert(error)
        })
      // commit('switchLogin')
      this.$router.push('/')
  },
//新規登録後、googleLogin後、　commitでmutationsのgetDataとswitchLoginを実行
  checkLogin ({ commit }) {
    console.log('checkLogin!')
    // firebase.auth().onAuthStateChanged( user => {
      if (user) {
        console.log('=== SIGNING');
        console.log('user.uid'+user.uid);
        console.log('user.email'+user.email);
        commit('getData', { uid: user.uid, email: user.email })
        // commit('switchLogin',true)//ログイン状態を確認するためのもの
      } else {
        // commit('switchLogin',false)
        this.deleteLoginUser()
        this.$router.push('/')
      }
    // })
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
  // uid: state => state.login_user ? state.login_user.uid : null,
  uid: state => state.user ? state.user.uid : null,
  // userUid: state => state.userUid ? state.userUid : '',//追加
  // userName: state => state.login_user ? state.login_user.displayName : '',
  // photoURL: state => state.login_user ? state.login_user.photoURL : '',
  loginUser(state){
    // console.log('ログイン状態:' + state.login_user)
    console.log('ログイン状態:' + state.loggedIn)
    // return state.login_user
    return state.loggedIn
  },
  setDisplayName(state){
    return state.displayName
  },
  setPhotoURL(state){
    return state.photoURL
  },
  user: state => {
    const user = firebase.auth().currentUser
    state.login_user = user
    return state.login_user
    // return state.user
  },
}
//   userName: state => state.login_user ? state.login_user.displayName : '',
//   photoURL: state => state.login_user ? state.login_user.photoURL : ''
// }
