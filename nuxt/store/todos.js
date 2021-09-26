import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')//コレクションはtodoを使う

export const state = () => ({
  todos: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)//バインドしたいデータとコレクションへの参照（関連付けされる）
  }),
  add: firestoreAction((context, name) => {
    if(name.trim()) {
      todosRef.add({//todosRefメソッドでaddでストアに登録
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        state: '作業前'
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()//doc(id)でドキュメントidを指定
  }),
  toggle: firestoreAction((context, todo) => {//toggleでtodoの完了を確認する
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  })
}
export const getters = {
  orderdTodos: state => {
    return _.sortBy(state.todos, 'created')
  }
}
