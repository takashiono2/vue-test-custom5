<template>
  <div>
    パラメータ：{{ $route.params.id }}
    <!-- todos一覧：{{ todoStates　}} -->
    <ul v-for="todo in todoStates" :key="todo.id">
      <li>名前:{{ todo.name }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    layout: 'default',
    data(){
      return {
        todos:[]
      }
    },
    created: function() {
      this.$store.dispatch('todos/init')
    },
    computed:{
      todoStates(){
        return this.$store.getters['todos/orderdTodos']
        // return this.$store.state.todos.todos
      }
    },
    // props: {
    //   name: 'users-id',
    // },
    validate ({ params }) {
      // 「\w」アルファベット、アンダーバー、数字
      return /^\w+$/.test(params.id)
    }
  }

</script>
