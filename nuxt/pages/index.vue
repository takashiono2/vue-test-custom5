<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>ログイン</h1>
        <p>googleアカウントログインページ</p>
      </v-flex>
      <v-flex xs12 mt-5>
        <v-btn color="info" @click="googleLogin">googleアカウントでログイン</v-btn>
        <!-- <v-btn color="info" @click="$store.dispatch('todos/login')">googleアカウントでログイン</v-btn> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'
export default {
// created (){//DOMが生成された直後
  mounted (){
  firebase.auth().onAuthStateChanged(user => {//ログインするユーザーを監視する
    //var user = firebase.auth().currentUser //ログインしたらコールバック関数が働く
    if (user) {
      //this.setLoginUser(user)//setLoginUserでuserを格納
      console.log('=== SIGNIN');
      this.$store.commit('switchLogin')
      this.$router.push('/todos')
    } else {
      console.log('=== SIGNOUT');
      // this.isLogin = null;
      this.deleteLoginUser()
      this.$router.push('/')
    }
  })
},
  // computed: {
  //   ...mapGetters(['loginUser'])
  // },
  methods: {
    googleLogin(){
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    // setLoginUser(user){
    //   user = 'test2'
    //   console.log(user)
    //   this.$store.dispatch('setLoginUser',user)
    // },
    deleteLoginUser(){
      this.$store.dispatch('deleteLoginUser')
      this.$store.dispatch('logOut')
    }
  //   // ...mapActions(['googleLogin'])
  //   // ...mapActions(['setLoginUser','googleLogin','logOut','deleteLoginUser'])
  //   // ...mapActions(['googleLogin'])
  // }
    // ...mapActions(['googleLogin','setLoginUser'])
  },
  computed: {
    user () {
      return this.$store.getters['user']
    },
  },
}

</script>
