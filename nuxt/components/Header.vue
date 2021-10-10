<template>
  <div>
    <v-app-bar color="primary" dark app clipped-left><!--clippedあると、ナビバーを巻き込まない-->
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')" >Todoリスト</v-toolbar-title>
      <v-spacer />

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
            <v-list-item>
              <v-list-item-content>
                <v-toolbar-items
                  v-for="item in items"
                  :key="item.title"
                   class="ma-5 text-right"
                >
                  <v-icon>{{item.icon}}</v-icon>
                  <v-btn text>{{item.title}}</v-btn>
                </v-toolbar-items>
              </v-list-item-content>
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
    <!-- <h1>Todoリスト</h1> -->
      <router-link to='/'>ホームへ</router-link> |
      <router-link to='/create'>作成ページへ</router-link> |
      <router-link to='/edit'>編集ページへ</router-link>
    </div>
</template>

<script>
export default {
  data(){
    return {
        items:[
          {icon: 'mdi-lock-open',title: 'ログイン'},
          {icon: 'mdi-account-plus-outline',title: '新規登録'},
          {icon: 'mdi-account',title: 'ユーザー'}
        ]
    }
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
