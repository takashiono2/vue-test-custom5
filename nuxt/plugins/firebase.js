import firebase from 'firebase'

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

if(!firebase.apps.length){
  firebase.initializeApp(config)
}

 // 今回は現在のセッションまたはタブでのみ状態が保持される設定
 　firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
  console.log('firebase.jsにてInitialized!') // 確認用のメッセージ
})

export const auth = firebase.auth
export default firebase
