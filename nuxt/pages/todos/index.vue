<template>
  <!-- <v-main> -->
    <section class="container">
        <nuxt-link to='/todos'
        exact
        active-class="link-active"
        >ホームへ</nuxt-link> |
        <nuxt-link to='/todos/create'
        exact
        active-class="link-active"
        >作成ページへ</nuxt-link> |
      <div>
        <span>
          <strong>{{ remaining.length }}件</strong>完了/合計{{doneTodos.length}}件
        </span>
          <div>
            <span><v-btn outlined @click="allState">全て</v-btn></span>
            <span><v-btn outlined color="red" @click="goState">未完了</v-btn></span>
            <span><v-btn outlined color="green" @click="doState">作業中</v-btn></span>
            <span><v-btn outlined color="blue" @click="finState">完了</v-btn></span>
          </div>
      </div>
      <span>チェックを削除：<v-icon dense class="ma" @click="allRemove()">mdi-delete</v-icon></span>
          <table class="showtable">
            <thead>
              <tr>
                <span>
                  <th>チェック | </th>
                  <th>タスク | </th>
                  <th>削除 | </th>
                  <th>登録日時 | </th>
                  <th>ボタン | </th>
                  <th>状態 | </th>
                  <th>メモ | </th>
                  <th>終了予定日</th>
                </span>
              </tr>
            </thead>
            <tbody>
              <tr v-for="todo in doneTodos" :key="todo.id">
                <span v-if="todo.created">
                  <!-- <td>{{ todo.name }}</td> -->
                  <td>
                    <input
                      type="checkbox"
                      :checked ="todo.done"
                      @change="toggle(todo)"
                    >
                  </td>
                  <td>
                    <nuxt-link :to="{ name: 'show-id',params: {id: todo.id}}"
                        exact
                        active-class="link-active"
                        >{{ todo.name }}</nuxt-link>
                    <nuxt-link :to="{ name: 'todos-id',params: {id: todo.id}}"
                        exact
                        active-class="link-active"
                    ><v-icon dense class="ma" @click="editBtn(todo.id)">mdi-pencil</v-icon>
                    </nuxt-link>
                  </td>

                  <!-- <td><button @click="remove(todo.id)">削除</button></td> -->
                  <!-- <td><v-icon dense class="ma" @click="edit(todo.id)">mdi-pencil</v-icon></td> -->
                  <td><v-icon dense class="ma" @click="remove(todo.id)">mdi-delete</v-icon>
                  <!-- <span><v-icon dense class="ma" @click="allRemove(todo.id)">mdi-delete</v-icon></span> -->
                  </td>
                  <td>{{ todo.created.toDate() | dateFilter }}</td>
                  <td>
                    <v-btn
                      outlined
                      :class ="{
                        'button--yet':todo.state == '未完了',
                        'button--do':todo.state == '作業中',
                        'button--done':todo.state == '完了',
                      }"
                      @click="changeState(todo.state,todo.id)"
                    >{{todo.state}}
                    </v-btn>
<!-- <v-btn outlined class="button"
  v-bind:class="{
    'button--yet':todo.state == '未完了',
    'button--done':todo.state == '完了',
    }"
  @click="changeState(todo)">
  {{ todo.state }}
</v-btn> -->
                    <!--<span>{{ selection[todo.id] }}</span>
                      <span>{{ todo.state }}</span>
                      <select v-model="selection[todo.id]" @change="toggle(todo)">
                          <option disabled value="">選択して下さい</option>
                          <option value="未設定">未設定</option>
                          <option value="作業中">作業中</option>
                          <option value="完了">完了</option>
                      </select>--><!--valueの値がv-modlになり、v-modelは、dataのオブジェクトをとってくる-->
                  </td>
                  <td>
                    {{todo.discription}}
                  </td>
                  <td>
                    {{todo.appointed_date}}
                    <!-- <template>
                      <date-picker @datePick="dateSet"></date-picker>
                    </template> -->
                  </td>
                </span>
              </tr>
              {{loginUser}}
            </tbody>
          </table>
    </section>
  <!-- </v-main> -->
</template>

<script>
  import moment from 'moment'
import { mapActions,mapGetters } from 'vuex'
  export default {
    layout: 'default',
    data: function(){
      return {
        todos:[],
        name:'',
        done: false,
        content:'',
        state: [],
        btn:'',
        discription:'',
        appointed_date:''
      }
    },
    created: function() {
      this.$store.dispatch('todos/init')
    },
    methods: {
      remove(id){
        if (!confirm("削除しますか？")) return;
          this.$store.dispatch('todos/remove',id)//idはfirestoreのid
      },
      toggle(todo){
        this.$store.dispatch('todos/toggle',todo)
      },
      // edit(id){
      //   this.$store.dispatch('todos/edit',id)
      // },
      editBtn(id){
        this.$router.push({ name: 'todos-id',params: {id: id}});
      },
      changeState(state,id){
        this.$store.dispatch('todos/changeState',{state,id})
      },
      allState(){//全表示ボタンallState()したらallbtnという名にする
        this.btn = 'allBtn';
      },
      goState(){//未完了ボタンgoState()したらgobtnという名にする
        this.btn = 'goBtn';
      },
      doState(){//未完了ボタンgoState()したらgobtnという名にする
        this.btn = 'doBtn';
      },
      finState(){//完了finState()したらfinbtnという名にする
        this.btn = 'finBtn';
      },
      allRemove(){
        if (!confirm("削除しますか？")) return;
          this.$store.dispatch('todos/allRemove')
      }
    },
    computed:{
      ...mapGetters(['loginUser']),
      // filteredTodos: function () {
      //   return filters[this.visibility](this.todos)
      // },
      doneTodos(){//時間並び処理
        this.todos = this.$store.getters['todos/orderdTodos']
        switch(this.btn){
          case 'goBtn':
            return this.todos.filter(todo=>todo.state === "未完了");
          case 'doBtn':
            return this.todos.filter(todo=>todo.state === "作業中");
          case 'finBtn':
            return this.todos.filter(todo=>todo.state === "完了");
          case 'allbtn':
            return this.todos;
          default:
            return this.todos;
          }
      },
      remaining(){//完了の数計算処理
        return this.doneTodos.filter(todo => {
          return todo.state === "完了"
        })
      },
    },
    filters:{
      dateFilter(date){
        return moment(date).format('YYYY/MM/DD HH:mm:ss')
      }
    }
  }
</script>

<style scoped>
.link-active{
  color: rgba(0,0,0,0.3);
}
.container{
  font-family: "Noto Sans Japanese", "Noto Sans", 'system-ui', sans-serif;
  font-weight: 700;
  font-size: 24px;
}

.showtable {
    margin-left: auto;
    margin-right: auto;
}
.showtable th,
.showtable td {
    border: 1px solid #CCCCCC;
    padding: 5px 10px;
    text-align: left;
}

.button--yet{
  color: red
}

.button--do{
  color: green
}

.button--done{
  color: blue
}


</style>
