<template>
  <section class="container">
      <router-link to='/'>ホームへ</router-link> |
      <router-link to='/create'>作成ページへ</router-link>
      <router-link to='/edit'>編集ページへ</router-link>
      <div>

        <!-- <div class="form">
          <form v-on:submit.prevent ="add">
            <input v-model="name" placeholder="タスクを入力してください">
            <button>Add</button>
          </form>
        </div> -->

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
              <th>タイトル</th>
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
              <td>
                <button class="button"
                  v-bind:class="{
                    'button--yet':todo.state == '作業前',
                    'button--progress':todo.state == '作業中',
                    'button--done':todo.state == '完了'}"
                  @click="changeState(item)">
                {{ todo.state }}
                </button>
              </td>
              <td><button @click="remove(todo.id)">削除</button></td>
              <td><button @click="edit(todo.id)">編集</button></td>
            </tr>
          </tbody>
        </table>

  </section>
</template>

<script>
  export default {
    layout: 'default',
    data: function(){
      return {
        name:'',
        done: false,
        content:'',
        // state:'作業前'
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
      todos(){
        return this.$store.state.todos.todos
      }
    }
  }
</script>
