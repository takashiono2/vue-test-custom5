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
            prepend-icon="mdi-account-circle"
            label="ユーザ名"
            v-model="name"
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
              <v-btn class="info" @click="submit">ログイン</v-btn>
            </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      showPassword : false,
      name:'',
      password:'',
    }
  },
  methods:{
    submit(){
      console.log(this.name,this.password)
    }
  }
}
</script>
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
