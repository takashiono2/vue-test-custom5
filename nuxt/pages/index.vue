<template>
  <section class="container">
      <router-link to='/'>ホームへ</router-link> |
      <router-link to='/create'>作成ページへ</router-link> |
      <router-link to='/edit'>編集ページへ</router-link>
    <div>
      <span class="todo-count">
        <!-- <strong>{{ remaining }}</strong> {{ remaining | pluralize }} 未完了 -->
        <strong>{{ remaining.length }}件</strong>完了/合計{{doneTodos.length}}件
      </span>
        <!-- <div class="form">
          <form v-on:submit.prevent ="add">
            <input v-model="name" placeholder="タスクを入力してください">
            <button>Add</button>
          </form>
        </div> -->
        <div class="Filter">
          <button @click="allState">全て</button>
          <button @click="goState">未完了</button>
          <button @click="finState">完了</button>
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
            <!-- <tr v-for="todo in todos" :key="todo.id"> -->
            <tr v-for="todo in doneTodos" :key="todo.id">
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
                        'button--yet':todo.state == '未完了',
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
        todos:[],
        name:'',
        done: false,
        content:'',
        state:'',
        btn:''
        // selection:[]
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
      },
      allState(){//全表示ボタンallState()したらallbtnという名にする
        this.btn = 'allBtn';
      },
      goState(){//未完了ボタンgoState()したらgobtnという名にする
        this.btn = 'goBtn';
      },
      finState(){//完了finState()したらfinbtnという名にする
        this.btn = 'finBtn';
      }
    },
    computed:{
      // filteredTodos: function () {
      //   return filters[this.visibility](this.todos)
      // },
      doneTodos(){//時間並び処理
        this.todos = this.$store.getters['todos/orderdTodos']
        switch(this.btn){
          case 'goBtn':
            return this.todos.filter(todo=>todo.state === "未完了");
            break;
          case 'finBtn':
            return this.todos.filter(todo=>todo.state === "完了");
            break;
          case 'allbtn':
            return this.todos;
            break;
          default:
            return this.todos;
          }
        // return this.$store.state.todos.todos
        // return this.$store.getters['todos/orderdTodos']
      },
      // todos() {
      //   // return this.$store.state.todos.todos
      //   return this.$store.getters['todos/orderdTodos']
      // },
      remaining(){//完了の数計算処理
        return this.doneTodos.filter(todo => {
          return todo.state === "完了"
        })
      }
    },
    filters:{
      dateFilter(date){
        return moment(date).format('YYYY/MM/DD HH:mm:ss')
      }
    }
  }
</script>
