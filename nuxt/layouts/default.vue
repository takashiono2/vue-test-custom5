<template>
  <v-app id="app">
    <div id="contents">
      <Header />
      <v-main>
        <Nuxt />
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Header from '~/components/Header.vue'
export default {

  components: {
    Header
  }

}

</script>
<style>
#contents{
  font-size: 1.4em;
  width:80%;
  text-align: center;
  min-height: 300px;
  color: #000000;
  margin: 0 auto;
  background-color :#ffffff;
  line-height: 1.5em;
  border-radius: 15px;
}

</style>
