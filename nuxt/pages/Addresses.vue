<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>連絡先一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 mr-5 text-xs-right>
        <nuxt-link to="/addressform">
          <v-btn color="info">
            連絡先追加
          </v-btn>
        </nuxt-link>
      </v-flex>
      <v-flex xs12 mt-3 justify-center>
        <v-data-table :headers='headers' :items='addresses'>
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.tel }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
            <!-- <td class="text-xs-left">
              <span>
                <router-link :to="{name: 'address_edit', params: { address_id: props.item.id }}">
                  <v-icon small class="mr-2">edit</v-icon>
                </router-link>
              </span>
            </td> -->
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created(){
    this.fetchAddresses()
    this.addresses = this.$store.state.addresses
  },
  methods: {
    ...mapActions(['fetchAddresses'])
  },
  data () {
    return {
      headers: [
        { text: '名前', value: 'name' },
        { text: '電話番号', value: 'tel' },
        { text: 'メールアドレス', value: 'email' },
        { text: '住所', value: 'address' }
        // { text: '操作', sortable: 'false' },
      ],
      addresses: []
    }
  }
}
</script>

<style scoped lang="scss">
// a{
//   text-decoration: none;
// }
</style>
//   created () {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         this.setLoginUser(user)
//         this.fetchAddresses()
//         if (this.$router.currentRoute.name === 'home') this.$router.push({ name: 'addresses' })
//       } else {
//         this.deleteLoginUser()
//         this.$router.push({ name: 'home' })
//       }
//     })
//   },
//   data () {
//     return {
//       //
//     }
//   },
//   methods: {
//     ...mapActions(['toggleSideMenu', 'setLoginUser', 'logout', 'deleteLoginUser', 'fetchAddresses'])
//   }
// }
