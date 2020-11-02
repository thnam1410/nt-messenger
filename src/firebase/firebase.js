import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCP_TTYX3T35ZqoAb-A69Ooosi3grzY3ZA",
  authDomain: "nt-messenger-clone.firebaseapp.com",
  databaseURL: "https://nt-messenger-clone.firebaseio.com",
  projectId: "nt-messenger-clone",
  storageBucket: "nt-messenger-clone.appspot.com",
  messagingSenderId: "853169117701",
  appId: "1:853169117701:web:1df7228b04b3bd4e25da6c",
  measurementId: "G-WKYKWDYYLX",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };
export default db;
