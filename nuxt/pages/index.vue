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
          <button>全て</button>
          <button>作業前</button>
          <button>作業中</button>
          <button>完了</button>
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
                <td>{{ todo.name }}</td>
                  <!--チェックボックスの場合
                    <td>
                        <input
                        type="checkbox"
                        :checked ="todo.done"
                        @change="toggle(todo)"
                        >
                    </td>-->
                <td><button @click="remove(todo.id)">削除</button></td>
                <td><button @click="edit(todo.id)">編集</button></td>
                <td>{{ todo.created.toDate() | dateFilter }}</td>
                <td>
                    <button class="button"
                      v-bind:class="{
                        'button--yet':todo.state == '作業前',
                        'button--progress':todo.state == '作業中',
                        'button--done':todo.state == '完了'}"
                      @click="changeState(todo)">
                      {{ todo.state }}
                    </button>
                   <!--<span>{{ selection[todo.id] }}</span>
                    <span>{{ todo.state }}</span>
                    <select v-model="selection[todo.id]" @change="toggle(todo)">
                        <option disabled value="">選択して下さい</option>
                        <option value="未設定">未設定</option>
                        <option value="作業中">作業中</option>
                        <option value="完了">完了</option>
                    </select>--><!--valueの値がv-modlになり、v-modelは、dataのオブジェクトをとってくる-->
                </td>
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
        state:'',
        selection:[]
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
        console.log(todo)
      },
      edit(id){
        this.$store.dispatch('todos/edit',id)
      },
      changeState: function(todo){
        this.$store.dispatch('todos/changeState',todo)
        console.log(todo.state)
        console.log(todo.name)
      }
    },
    computed:{
      // filteredTodos: function () {
      //   return filters[this.visibility](this.todos)
      // },
      todos() {
        // return this.$store.state.todos.todos
        return this.$store.getters['todos/orderdTodos']
      },
      stateFilter(){//状態をフィルター
        return this.$store.getters['todos/stateTodos']
      }
    },
    filters:{
      dateFilter(date){
        return moment(date).format('YYYY/MM/DD HH:mm:ss')
      }
    }
  }
</script>
