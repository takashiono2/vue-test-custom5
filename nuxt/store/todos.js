import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')//コレクションはtodoを使う

export const state = () => ({
  todos: [],
  // options:[
  //   {id:0 ,label:'作業前'},
  //   {id:1 ,label:'作業中'},
  //   {id:2 ,label:'完了'}
  // ]
})

export const actions = {
  //初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)//バインドしたいデータとコレクションへの参照（関連付けされる）
  }),
  //追加
  add: firestoreAction((context, name) => {
    if(name.trim()) {
      todosRef.add({//todosRefメソッドでaddでストアに登録
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        state: '未完了',
        discription :'',
        appointed_date: '',
      })
    }
  }),
  //削除
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()//doc(id)でドキュメントidを指定
  }),
  allRemove: firestoreAction(async (todo) => {
    const querySnapshot = await db.collection('todos')
    .where('done', '==', true)
    .get()
    console.log(querySnapshot.size)
    querySnapshot.forEach((todo) => {
      todosRef.doc(todo.id).delete()
      // console.log(todo.id)
      // console.log(todo.id, ' => ', JSON.stringify(todo.data()))
    })
  }),
  //状態変化
  changeState: firestoreAction((context, todo) => {//toggleでtodoの完了を確認する
    if(todo.state==="完了"){
      todosRef.doc(todo.id).update({
          state: '未完了'
        })
      }
    else if(todo.state==="未完了"){
      todosRef.doc(todo.id).update({
        state: '完了'
      })
    }
    }),
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
