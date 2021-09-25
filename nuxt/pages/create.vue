<template>
  <div>
    createページです
    <div class="form">
      <form v-on:submit.prevent ="add">
        <input v-model="name" placeholder="タスクを入力してください">
        <button>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    data: function(){
      return {
        name:'',
        done: false,
        content:'',
        state:'未達'
      }
    },
    created: function() {
      this.$store.dispatch('todos/init')
    },
    methods: {
      add(){
        this.$store.dispatch('todos/add',this.name)
        this.name = ''
        this.$router.push('/')
      }
    },
    computed:{
      todos(){
        return this.$store.state.todos.todos
      }
    }
  }
</script>

<style>

</style>
