<template>
  <section class="container">
    編集ページ
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
      <div class="form" v-for="todo in todoStates" :key="todo.id">
        <form :class="classList" @submit.prevent ="addEdit">
          <input type="text"
            v-model="name"
            class="text-input"
            :placeholder="todo.name"
            @focusin="startEditing"
            @focusout="finishEditing"
          >
          <textarea
            v-model="discription"
            class="discription"
            :placeholder="todo.discription"
            @focusin="startEditing"
            @focusout="finishEditing"
          ></textarea>
          {{todo.appointed_date}}
          {{date}}
          <template>
            <!-- <date-picker @datePick="dateSet(todo.appointed_date)"></date-picker> -->
            <date-picker :datetodoPick="todo.appointed_date"></date-picker>
          </template>
          <button class="add-button">Add</button>
        </form>
      </div>
    </div>

  <div>
    <p>名前だよ:{{todoStates}}</p>
    パラメータ：{{ $route.params.id }}
    <!-- todos一覧：{{ todoStates　}} -->
    <ul v-for="todo in todoStates" :key="todo.id">
      <li>
        <p>名前:{{ todo.name }}</p>
        <p>ID:{{todo.id}}</p>
        <p>状態：{{todoStates}}</p>
      </li>
    </ul>
  </div>
  </section>
</template>

<script>
  import DatePicker from '~/components/datePicker.vue'
  export default {
    layout: 'default',
    components: {
      'date-picker':DatePicker
    },
    data(){
      return {
        todos:[],
        name:'',
        discription:'',
        date: this.date,
        appointed_date:'',
        datetodoPick:''
      }
    },
    methods:{
      startEditing() {
        this.isEditing = true
      },
      finishEditing() {
        this.isEditing = false
      },
      addEdit(){
        console.log('addEdit時：'+this.name)
        console.log('addEdit時：'+this.discription)
        this.$store.dispatch('todos/addEdit',{
          id: this.id,
          name: this.name,
          // appointed_date: this.date,
          discription: this.discription
          })
        console.log('name:'+this.name)
        console.log('discription:'+this.discription)
        this.$router.push("/")
      },
      dateSet(appointed_date){
        return this.date = appointed_date
      }
    },
    created: function() {
      this.$store.dispatch('todos/init')
    },
    computed:{
      id(){
        return this.$route.params.id
      },
      // name(){
      //   this.todos = this.$store.state('todos')
      //   this.name = this.todos.filter((todo)=>{
      //     return todo.name
      //   })
      // console.log('name計算：'+this.name)
      // },
      todoStates(){
        this.todos = this.$store.getters['todos/orderdTodos']
        return this.todos.filter((todo)=>{
          return todo.id === this.id
        })
      },
      // todos(){
      //   // return this.$store.state.todos.todos
      // return
      // },
      classList(){
        const classList = ['addName']//addNameは何でもいい
          if (this.isEditing) {
            classList.push('active')
          }
          return classList
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

<style>
form input{
  height: 1.6em;
  width: 200px;
}

.text-input, .discription{
  margin: 10px 0;
  padding: 20px 15px;
  width: calc(100% - 30px);
  background-color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-family: "Noto Sans Japanese", "Noto Sans", 'system-ui', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #242424;
  cursor: pointer;
  overflow: overlay;
}

.text-input:focus {
  outline: 0;
  cursor: initial;
}

.active .text-input {
  background-color: #fff;
}

textarea.discription{
  height: 300px;
}

.add-button {
  margin-top: 15px;
  padding: 15px 18px;
  background-color: #999;
  border: none;
  border-radius: 8px;
  font-family: "Noto Sans Japanese", "Noto Sans", 'system-ui', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
}

.add-button:hover {
  opacity: 0.8;
  cursor: pointer;
}

.addable .add-button {
  background-color: #00d78f;
  pointer-events: auto;
  cursor: pointer;
}

.add-button:active {
  background-color: #00d78f;
}
</style>
