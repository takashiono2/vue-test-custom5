<template>
  <div>
    パラメータ：{{ $route.params.id }}
    <!-- todos一覧：{{ todoStates　}} -->
    <ul v-for="todo in todoStates" :key="todo.id">
    <form @submit.prevent ="editAdd">
      <input type="text"
        v-model="name"
        class="text-input"
        placeholder="タスクを入力してください"
        @focusin="startEditing"
        @focusout="finishEditing"
      >
      <v-btn>Add</v-btn>
    </form>
      <li>
        <p>名前:{{ todo.name }}</p>
        <p>ID:{{todo.id}}</p>
        <p>状態：{{todoStates}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    layout: 'default',
    data(){
      return {
        todos:[],
        name:'',
      }
    },
    methods:{
      startEditing() {
        this.isEditing = true
      },
      finishEditing() {
        this.isEditing = false
      }
    },
    created: function() {
      this.$store.dispatch('todos/init')
    },
    computed:{
      id(){
        return this.$route.params.id
      },
      todoStates(){
        this.todos = this.$store.getters['todos/orderdTodos']
        return this.todos.filter((todo)=>{
          return todo.id === this.id
        })
      }
        // return this.todos.find((todo)=> todo.id === "this.id")
        // return this.$store.state.todos.todos
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
