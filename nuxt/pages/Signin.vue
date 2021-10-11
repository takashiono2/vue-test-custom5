<template>
  <div class="login-form">
    <form @submit.prevent="login">
      <v-card>
        <v-card-title>
          <h1 class="display-1">ログイン</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="ユーザ名" />
            <v-text-field label="パスワード" />
          </v-form>
        </v-card-text>
      </v-card>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: null,
        email: "",
        password: "",
      }
    },
  }
</script>
