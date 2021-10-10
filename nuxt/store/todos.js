import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')//コレクションはtodoを使う

export const state = () => ({
  todos: [],
  // options:[
  //   // {num:0 ,label:'未完了'},
  //   // {num:1 ,label:'作業中'},
  //   // {num:2 ,label:'完了'}
  // ]
})

export const actions = {
  //初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)//バインドしたいデータとコレクションへの参照（関連付けされる）
  }),
  //追加
  add: firestoreAction((context,{name,appointed_date,discription}) => {
    if(name.trim()) {
      todosRef.add({//todosRefメソッドでaddでストアに登録
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        state: '未完了',
        discription: discription,
        appointed_date: appointed_date,
      })
    }
  }),
  //更新
  addEdit: firestoreAction((context,{id,name,discription,appointed_date}) => {
    if(name.trim()){
      todosRef.doc(id).update({//todosRefメソッドでaddでストアに登録
        name: name,
        discription: discription,
        appointed_date: appointed_date
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }
  }),
  //削除
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()//doc(id)でドキュメントidを指定
  }),
  //選択削除
  allRemove: firestoreAction(async (todo) => {
    const querySnapshot = await db.collection('todos')
    .where('done', '==', true)
    .get()
    querySnapshot.forEach((todo) => {
      todosRef.doc(todo.id).delete()
      // console.log(todo.id)
      // console.log(todo.id, ' => ', JSON.stringify(todo.data()))
    })
  }),
  //状態変化
  changeState: firestoreAction(async (context,{state,id})=> {
    try{
      const postDoc = await todosRef.doc(id).get()
      if((postDoc.get('state')===state) && (postDoc.get('state')==='未完了')){
        todosRef.doc(id).update({
          state: '作業中'
        })
      }
      if((postDoc.get('state')===state) && (postDoc.get('state')==='作業中')){
        todosRef.doc(id).update({
          state: '完了'
        })
      }
      if((postDoc.get('state')===state) && (postDoc.get('state')==='完了')){
        todosRef.doc(id).update({
          state: '未完了'
        })
      }
    }catch(err){
        console.log(`Error: ${JSON.stringify(err)}`)
      }
    // for(let i = 0; i < todo.state.length; i++) {
    //   const ob = todo.state.todos[i];
    //   if(ob.content == obj.content && ob.created == obj.created && ob.state == obj.state) {
    //     let nowState;
    //     for(let j = 0; j < todo.state.length; j++){
    //       if(state.todo.option[j].label == ob.state){
    //         nowState = state.option[j].id;
    //       }
    //     }
    //     nowState++;
    //     if(nowState >= state.todo.option.length){
    //       nowState = 0;
    //     }
    //     obj.state = state.todo.option[nowState].label
    //     return;
    //   }
  }),
  // changeState: firestoreAction((context, todo) => {//toggleでtodoの完了を確認する
  //   if(todo.state==="完了"){
  //     todosRef.doc(todo.id).update({
  //         state: '未完了'
  //       })
  //     }
  //   else if(todo.state==="未完了"){
  //     todosRef.doc(todo.id).update({
  //       state: '完了'
  //     })
  //   }
  // })
  toggle: firestoreAction((context, todo) => {//チェックボックスの更新
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  })
}
export const getters = {
  orderdTodos: state => {
    return _.sortBy(state.todos, 'created')
  },
  // todoState: state => {
  //   return state.todos
  // }
}
