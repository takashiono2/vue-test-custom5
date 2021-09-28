<template>
<section class="container">
  <div>
      <router-link to='/'
      exact
      active-class="link-active"
      >ホームへ</router-link> |
      <router-link to='/create'
      exact
      active-class="link-active"
      >作成ページへ</router-link> |
      <router-link to='/edit'
      exact
      active-class="link-active"
      >編集ページへ</router-link>
    <!-- <div class="form">
      <form v-on:submit.prevent ="add">
        <input v-model="name" placeholder="タスクを入力してください">
        <button>Add</button>
      </form>
    </div> -->
  </div>
</section>
</template>

<script>
// export default {
//   data: function(){
//     return {
//       name:'',
//       done: false,
//       content:'',
//       // state:'作業前'
//     }
//   },
//   methods: {
//     add(){
//       this.$store.dispatch('todos/add',this.name)
//       this.name = ''
//     }
//   }
// }
</script>

<style>

</style>
