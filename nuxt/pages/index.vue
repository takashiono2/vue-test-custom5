<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>ログイン</h1>
        <p>googleアカウントログインページ</p>
      </v-flex>
      <v-flex xs12 mt-5>
        <!-- <v-btn color="info" @click="login">googleアカウントでログイン</v-btn> -->
        <v-btn color="info" @click="$store.dispatch('todos/login')">googleアカウントでログイン</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // import { mapAction } from 'vuex'

  // export default {
  //   methods:{
  //     ...mapAction(['todos/login'])
  //   }
  // }
</script>
