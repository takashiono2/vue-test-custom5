<template>
  <section class="container">
      <router-link to='/'>ホームへ</router-link> |
      <router-link to='/create'>作成ページへ</router-link>
      <router-link to='/edit'>編集ページへ</router-link>
      <div>
    <span class="todo-count">
      <!-- <strong>{{ remaining }}</strong> {{ remaining | pluralize }} 未完了 -->
      <strong>件</strong>未完了
    </span>
        <!-- <div class="form">
          <form v-on:submit.prevent ="add">
            <input v-model="name" placeholder="タスクを入力してください">
            <button>Add</button>
          </form>
        </div> -->

        <div class="Filter">
          <button :class="{ selected: visibility == 'all' }">全て</button>
          <button :class="{ selected: visibility == 'active' }">作業前</button>
          <button :class="{ selected: visibility == 'work' }">作業中</button>
          <button :class="{ selected: visibility == 'completed' }">完了</button>
        </div>
      </div>

        <table class="Lists">
          <thead>
            <tr>
              <span>
                <th>タイトル | </th>
                <th>状態 | </th>
                <th>ボタン | </th>
                <th>登録日時 | </th>
              </span>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in todos" :key="todo.id">
              <span v-if="todo.created">
                <td>
                  {{ todo.name }}
                    <input
                    type="checkbox"
                    :checked ="todo.done"
                    @change="toggle(todo)"
                    >
                  </td>
                <td>
                  <select v-model="selected">
                    <option disabled value="">Please select one</option>
                    <option>作業前</option>
                    <option>作業中</option>
                    <option>完了</option>
                  </select>
                  <span>状態: {{ todo.state }}</span>
                </td>
                <td><button @click="remove(todo.id)">削除</button></td>
                <td><button @click="edit(todo.id)">編集</button></td>
                <td>{{ todo.created.toDate() | dateFilter }}</td>
              </span>
            </tr>
          </tbody>
        </table>

  </section>
</template>

<script>
  import moment from 'moment'
  export default {
    layout: 'default',
    data: function(){
      return {
        name:'',
        done: false,
        content:'',
        state:'作業前',
        // visibility: 'all'
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
        if (!confirm("削除しますか？")) return;
        this.$store.dispatch('todos/remove',id)//idはfirestoreのid
      },
      toggle(todo){
        this.$store.dispatch('todos/toggle',todo)
      },
      edit(id){
        this.$store.dispatch('todos/edit',id)
      },
    },
    computed:{
      // filteredTodos: function () {
      //   return filters[this.visibility](this.todos)
      // },
      todos() {
        // return this.$store.state.todos.todos
        return this.$store.getters['todos/orderdTodos']
      }
    },
    filters:{
      dateFilter(date){
        return moment(date).format('YYYY/MM/DD HH:mm:ss')
      }
    }
  }
</script>
