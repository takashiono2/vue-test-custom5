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
    <div class="form">
      <form :class="classList" @submit.prevent ="add">
        <input type="text"
          v-model="name"
          class="text-input"
          placeholder="タスクを入力してください"
          @focusin="startEditing"
          @focusout="finishEditing"
        >
        <textarea
          v-model="discription"
          class="discription"
          placeholder="詳細を入力してください"
          @focusin="startEditing"
          @focusout="finishEditing"
        ></textarea>
        <template>
          <date-picker @datePick="dateSet">{{dateSet(date)}}</date-picker>
        </template>
        <button class="add-button">Add</button>
      </form>
    </div>
  </div>
</section>
</template>

<script>
import DatePicker from '~/components/DatePicker.vue'
export default {
    components: {
    'date-picker':DatePicker
    },
    data: function(){
      return {
        name:'',
        // done: false,
        // content:'',
        // state:'未完了',
        discription:'',
        date: this.date
        // appointed_date: new Date().toISOString().substr(0, 10),
      }
    },
    created: function() {
      this.$store.dispatch('todos/init')
    },
    methods: {
      add(){
        // console.log('addボタン上'+this.dateSet(date))
        console.log('addボタン上'+this.date)
        // this.appointedDate = Number(this.date.substr(5,2)) + "/" + Number(this.date.substr(8,2))
        // this.appointedDate = Number(this.appointed_date.substr(5,2)) + "/" + Number(this.appointed_date.substr(8,2))
        // this.$store.dispatch('todos/add',this.name)
        this.$store.dispatch('todos/add',{name: this.name,appointed_date:this.date})
        this.name = ''
      },
      // add(){
      //   this.$store.dispatch('todos/add',this.name)
      //   cosole.log(this.name)
      //   this.name = ''
      //   this.$router.push('/')
      // },
      startEditing() {
        this.isEditing = true
      },
      finishEditing() {
        this.isEditing = false
      },
      dateSet(date){
        return this.date = date
        // console.log('dateSet関数:'+this.date)
      }
    },
    computed:{
      todos(){
        return this.$store.state.todos.todos
      },
      classList(){
        const classList = ['addName']//addNameは何でもいい
          if (this.isEditing) {
            classList.push('active')
          }
          return classList
      },
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

/*

.info-line {
  margin: 20px;
  font-size: 20px;
}

.list-index {
  display: flex;
}

.addlist {
  margin: 0 10px auto;
  display: inline-block;
  flex-direction: column;
  align-items: flex-start;
  min-width: 320px;
  width: 320px;
}

.list {
  margin: 0 5px auto;
  position: relative;
  display: inline-block;
  flex-direction: column;
  align-items: flex-start;
  min-width: 290px;
  width: 290px;
  background-color: #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  border: solid #ddd 1px;
  color: gray;
  vertical-align: top;
}

.listheader {
  width: 290px;
  display: inline-flex;
  justify-content: space-between;
}

.list-title {
  font-size: 20px;
  font-weight: bold;
  padding: 15px;
}

.list-counter {
  color: rgb(0, 140, 255);
  padding: 15px;
}

.deletelist {
  position: absolute;
  top: 6px;
  right: 14px;
  font-size: 28px;
}

.deletelist:hover {
  opacity: 0.8;
  cursor: pointer;
}

.card {
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  padding: 30px 15px 40px;
  background-color: #fff;
  border-radius: 8px;
  width: 260px;
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: 6px;
  right: 15px;
  font-size: 22px;
  cursor: pointer;
  border-radius: 8px;
  border-color: red;
  border-style: solid;
  background-color: red;
  color: white;
  margin: 5px;
}

.body {
  font-size: 18px;
  width: 100%;
  word-wrap: break-word;
} */
</style>
