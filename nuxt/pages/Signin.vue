<template>
<!-- https://reffect.co.jp/vue/vuetify-first-time -->
  <div class="login-form">
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">ログイン</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-email-outline"
            label="Email"
            v-model="email"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="パスワード"
            v-model="password"
          />
<!--エラーメッセージ-->
          <v-alert
            v-if="loginErrorMsg"
            dense
            text
            type="error"
          >
            {{ loginErrorMsg }}
          </v-alert>
<!--ここまで、エラーメッセージ-->
            <v-card-actions>
              <v-btn class="info" @click="submit">ログイン</v-btn>
            </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from '../plugins/firebase'

export default {
  layout: 'signin',//layoutのdefaultページをsinginページに置き換える
  data() {
    return {
      showPassword : false,
      email:'',
      password:'',
      //login_valid: true,  //後から追加vuetifyのバリデーションv-model=valid lazy-validation
      loginErrorMsg: '',//追加
      //socialLoginErrorMsg: ''  //googleボタンのエラーメッセージ用
    }
  },
  methods:{
    submit(email,password){
      this.$store.dispatch('logIn', {
                                      email: this.email,
                                      password: this.password
                                    }
                          )
    }
  }
}
</script>
<!--参考https://www.metrocode.co/blog/post/firebase-authentication-nuxt-vuejs-->
<!--
・サービス名／ロゴ
・ログインフォーム
　・IDパスワード入力欄
　・ログインボタン
　・Googleログインボタン
・新規ユーザー登録ボタン
・ローダー
機能）
・IDパスワードログイン
・Googleログイン
データ）
・ユーザーID（半角英数4文字以上ユニーク）
・パスワード（半角英数8文字以上）
-->
