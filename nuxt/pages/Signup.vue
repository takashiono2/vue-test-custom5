<template>
<!-- https://reffect.co.jp/vue/vuetify-first-time -->
  <div class="login-form">
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">新規登録</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-account-circle"
            label="ユーザ名"
            v-model="name"
          />
          <v-text-field
            prepend-icon="mdi-email-outline"
            label="Email"
            v-model="mail"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="パスワード"
            v-model="password"
          />
            <v-card-actions>
              <v-btn class="info" @click="submit">登録</v-btn>
              <v-spacer />
              <nuxt-link to="/signin">ログインはこちら</nuxt-link>
            </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showPassword : false,
        name:'',
        password:'',
        mail:'',
      }
    },
    methods:{
      submit(){
        console.log(this.name,this.password)
     }
    }
  }
</script>
<!---
・IDパスワード入力欄
・ユーザー名入力欄
・新規登録ボタン
・ログインはこちら
機能）
・登録
データ）
・メールアドレス
・パスワード（半角英数8文字以上）
・Googleアカウント
-->
