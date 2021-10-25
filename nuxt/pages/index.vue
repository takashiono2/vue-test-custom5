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
import firebase from '../plugins/firebase'
export default {
data () {
  return {
    //
  }
},
created (){
  firebase.auth().onAuthStateChanged(user => {//ログインするユーザーを監視する
    if (user) {
      // this.setLoginUser(user)//setLoginUserでuserを格納
      const { uid, displayName } = user;
      this.$store.dispatch("setLoginUser", { uid, displayName });
      console.log('=== SIGNIN');
      // this.$store.commit('switchLogin')
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
    ...mapActions(['googleLogin','setLoginUser','logOut','deleteLoginUser']),
    // googleLogin(){
    //   const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    //   firebase.auth().signInWithRedirect(google_auth_provider)
    // },
    // setLoginUser(user){
    //   user = 'test2'
    //   console.log(user)
    //   this.$store.dispatch('setLoginUser',user)
    // },
    deleteLoginUser(){
      this.$store.dispatch('deleteLoginUser')
      this.$store.dispatch('logOut')
    },
  //   // ...mapActions(['googleLogin'])
  //   // ...mapActions(['setLoginUser','googleLogin','logOut','deleteLoginUser'])
  //   // ...mapActions(['googleLogin'])
  // }
  },
  // computed: {
  //   user () {
  //     return this.$store.getters['user']
  //   },
  // },
}

</script>
