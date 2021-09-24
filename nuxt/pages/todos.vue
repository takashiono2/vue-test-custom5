<template>
  <section class="container">
      <h1>Todoリスト</h1>
      <router-link to='/'>ホームへ</router-link> |
      <router-link to='/create'>作成ページへ</router-link>
      <div>

        <div class="form">
          <form v-on:submit.prevent ="add">
            <input v-model="name" placeholder="タスクを入力してください">
            <button>Add</button>
          </form>
        </div>

        <div class="Filter">
          <button class="button button--gray is-active">全て</button>
          <button class="button button--gray">作業前</button>
          <button class="button button--gray">作業中</button>
          <button class="button button--gray">完了</button>
        </div>
      </div>

        <table class="Lists">
          <thead>
            <tr>
              <th>タスク</th>
              <th>登録日時</th>
              <th>状態</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in todos" :key="todo.id">
              <td>
                {{ todo.name }}
                  <input
                  type="checkbox"
                  :checked ="todo.done"
                  @change="toggle(todo)"
                  >
                </td>
              <td>2020-04-30 17:00</td>
              <td><button class="button button--yet">作業前</button></td>
              <td><button @click="remove(todo.id)">削除</button></td>
            </tr>
          </tbody>
          <!-- <ul>
            <li v-for="todo in todos" :key="todo.id">
              {{ todo.done }} {{ todo.name }} {{ todo.created }}
              <input
              type="checkbox"
              :checked ="todo.done"
              @change="toggle(todo)"
              >
              <button @click="remove(todo.id)">削除</button>
            </li>
          </ul> -->


        </table>

  </section>
</template>

<script>
  export default {
    data: function(){
      return {
        name:'',
        done: false
      }
    },
    created: function() {
      this.$store.dispatch('todos/init')
    },
    methods: {
      add(){
        this.$store.dispatch('todos/add',this.name)
        this.name = ''
      },
      remove(id){
        this.$store.dispatch('todos/remove',id)//idはfirestoreのid
      },
      toggle(todo){
        this.$store.dispatch('todos/toggle',todo)
      }
    },
    computed:{
      todos(){
        return this.$store.state.todos.todos
      }
    }
  }
</script>
