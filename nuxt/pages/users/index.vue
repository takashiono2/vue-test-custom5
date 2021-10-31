<template>
  <ul>
    <li v-for="user in users" :key="user.id" >
      {{ user.name }}
    </li>
  </ul>
</template>

<script>
  import firebase from '../../plugins/firebase'

  export default{
    data(){
      return {
        users:[],
        // user:'',
        // name:'',
        // email:'',
        // photoUrl:''
      }
    },
    computed: {
      user () {
        return this.$store.getters['user']
      },
    },
    // mounted(){
    //   const user = firebase.auth().currentUser;
    //   // const name, email, photoUrl;

    //   if (user != null) {
    //     name = user.displayName;
    //     email = user.email;
    //     photoUrl = user.photoURL;
    //   }
    // }
  }
</script>
