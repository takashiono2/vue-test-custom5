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
import { mapActions } from 'vuex'
import firebase from '~/plugins/firebase'
export default {

mounted(){//DOMが生成された直後
  firebase.auth().onAuthStateChanged(user => {//ログインするユーザーを監視する
    //var user = firebase.auth().currentUser //ログインしたらコールバック関数が働く
    if (user) {
      console.log(user)
      this.setLoginUser(user)//setLoginUserでuserを格納
      console.log('=== SIGNIN');
      this.$router.push('/todos')
      return
    } else {
      console.log('=== SIGNOUT');
      this.deleteLoginUser()
      this.$router.push('/')
    }
  })
},
  methods: {
    googleLogin(){
      this.$store.dispatch('googleLogin')
    },
    setLoginUser(){
      this.$store.dispatch('setLoginUser')
    },
    deleteLoginUser(){
      this.$store.dispatch('deleteLoginUser')
      this.$store.dispatch('logOut')
    }
  //   // ...mapActions(['googleLogin'])
  //   // ...mapActions(['setLoginUser','googleLogin','logOut','deleteLoginUser'])
  //   // ...mapActions(['googleLogin'])
  // }
    // ...mapActions(['googleLogin','setLoginUser'])
  }
}

</script>
