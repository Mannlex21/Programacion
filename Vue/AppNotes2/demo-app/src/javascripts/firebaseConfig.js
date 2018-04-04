import Firebase from 'firebase'
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDYrZsLbAVUJRORgML8BdVStkyHJu_p1ak',
  authDomain: 'appnote-4b46d.firebaseapp.com',
  databaseURL: 'https://appnote-4b46d.firebaseio.com',
  projectId: 'appnote-4b46d',
  storageBucket: 'appnote-4b46d.appspot.com',
  messagingSenderId: '407642277299'
}
let app = Firebase.initializeApp(config)
export const db = app.database()
