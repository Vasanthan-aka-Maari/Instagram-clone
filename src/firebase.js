import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCGtScw5QvruR0qqG0iM7rPphBvoB4pMR4",
  authDomain: "my-own-instagram-ceb49.firebaseapp.com",
  databaseURL: "https://my-own-instagram-ceb49.firebaseio.com",
  projectId: "my-own-instagram-ceb49",
  storageBucket: "my-own-instagram-ceb49.appspot.com",
  messagingSenderId: "305373046837",
  appId: "1:305373046837:web:6fade11ba94039af44697c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, storage, auth };
