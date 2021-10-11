<template>
<section class="container">
  <div>
    <router-link to='/todos'
      exact
      active-class="link-active"
    >ホームへ</router-link> |
    <router-link to='/todos/create'
      exact
      active-class="link-active"
    >作成ページへ</router-link> |
    <div class="form">
      <form :class="classList" @submit.prevent ="add">
        <validation-provider v-slot="{ errors }" rules="required|length:10" name="タスク"><!--エラーメッセージ-->
          <input type="text"
            v-model="name"
            class="text-input"
            placeholder="タスクを入力してください（10文字以内）"
            @focusin="startEditing"
            @focusout="finishEditing"
          >
        <p v-show="errors.length" class="errorname">{{ errors[0] }}</p><!--エラーメッセージ-->
        </validation-provider><!--エラーメッセージ-->
        <validation-provider v-slot="{ errors }" rules="length:50" name="詳細">
          <textarea
            v-model="discription"
            class="discription"
            placeholder="詳細を入力してください（50文字以内）"
            @focusin="startEditing"
            @focusout="finishEditing"
          ></textarea>
        <p v-show="errors.length" class="errorname">{{ errors[0] }}</p><!--エラーメッセージ-->
        </validation-provider><!--エラーメッセージ-->
        <template>
          <!-- <date-picker @datePick="dateSet">{{dateSet(date)}}</date-picker> -->
          <date-picker @datePick="dateSet"></date-picker>
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
        date: this.date,
        props:['datetodoPick'],
        errors:[]
      }
    },
    created: function() {
      this.$store.dispatch('todos/init')
    },
    watch: {
      name(name) {
        this.name = this.charaLimit(name);//charaLimitに入力文字が入ってくるものをv-modelのthis.nameとし監視
      },
      discription(discription){
        this.discription = this.charaLimit(discription);
      }
    },
    methods: {
      charaLimit(name) {
        return name.length > 11 ? name.slice(0, -1) : name;//nameが10文字以上になったら、追加文字を削除していく
      },
      charaLimit(discription) {
        return discription.length > 51 ? discription.slice(0, -1) : discription;//50文字以上になったら、追加文字を削除していく
      },
      add(){
        // this.appointedDate = Number(this.date.substr(5,2)) + "/" + Number(this.date.substr(8,2))
        // this.appointedDate = Number(this.appointed_date.substr(5,2)) + "/" + Number(this.appointed_date.substr(8,2))
        // this.$store.dispatch('todos/add',this.name)
        if(!this.name){alert("タスクが未入力です"); return}
        this.$store.dispatch('todos/add',{
          name: this.name,
          discription: this.discription,
          appointed_date: this.date
        })
        console.log('作成時に送信されるappointed_date:'+this.date)
        this.name = ''
        this.discription = ''
        this.date = ''
        this.$router.push("/todos")
      },
      startEditing() {
        this.isEditing = true
      },
      finishEditing() {
        this.isEditing = false
      },
      dateSet(date){
        return this.date = date
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

<style scoped>
.link-active{
  color: rgba(0,0,0,0.3);
}
.container{
  padding-top: 0px;
  font-family: "Noto Sans Japanese", "Noto Sans", 'system-ui', sans-serif;
  font-weight: 700;
  font-size: 24px;
}
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

p.errorname{
  color: red;
  margin-bottom: 0px;
  font-size: 0.6em;
  text-align: right;
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
