<template>
  <div>
    <v-app-bar color="primary" dark app clipped-left><!--clippedあると、ナビバーを巻き込まない-->
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/todos')" >Todoリスト</v-toolbar-title>
      <v-spacer />
      <!-- <div v-if="$store.state.login_user"> -->
      <div v-if="login_user">
        <v-btn @click="logOut">ログアウト</v-btn>
      </div>
      <v-toolbar-items>
        <v-menu offset-y max-width="200">
          <template v-slot:activator="{on}">
            <v-btn
              text
              rounded
              fab
              class="mr-5"
            >
              <v-icon v-on="on">
                mdi-format-list-bulleted-square
              </v-icon>
            </v-btn>
            <!-- <v-icon v-on="on" class="mr-5">mdi-menu</v-icon> -->
          </template>
          <v-list>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.link"
              class="ma-5 text-right"
            >
              <v-icon>{{item.icon}}</v-icon>
              <v-btn text>{{item.title}}</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <!-- <v-toolbar-items v-for="item in items" :key="item">
        <v-icon>{{item.icon}}</v-icon>
        <v-btn text>{{item.title}}</v-btn> -->
        <!-- <v-btn text>ログイン</v-btn>s
        <v-btn text>新規登録</v-btn>
        <v-btn text>ユーザー</v-btn> -->
      <!-- </v-toolbar-items> -->
    </v-app-bar>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import firebase from '~/plugins/firebase'
export default {
  data(){
    return {
        items:[
          {icon: 'mdi-lock-open',title: 'ログイン',link: '/signin'},
          {icon: 'mdi-account-plus-outline',title: '新規登録',link: '/signup'},
          {icon: 'mdi-account',title: 'ユーザー',link:'#'}
        ]
    }
  },
  computed: mapState(['login_user']),
  created(){
    const user = firebase.auth().login_user
    if (user) {
        // ログイン済み
      this.user = user
    } else {
        // 未ログイン。ログイン画面へ遷移する
      this.$router.push('/login')
      return
    }
  },
  methods: {
    ...mapActions(['logOut'])
  }
}
</script>

<style>
/* #header{
  width: auto;
  height: 50px;
  background-color:#cff9ca;
  text-align: center;
} */
/* h1{
  line-height: 100%;
} */
</style>
