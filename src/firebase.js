import "firebase/database";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyDaoxEj3M6MQHlG4lm_EWXtCR6mVpQSRz4",
    authDomain: "react-jim.firebaseapp.com",
    databaseURL: "https://react-jim-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-jim",
    storageBucket: "react-jim.appspot.com",
    messagingSenderId: "1012961435954",
    appId: "1:1012961435954:web:8df186667979ff2b16b72b"
  };

  const app = initializeApp(firebaseConfig);
  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();