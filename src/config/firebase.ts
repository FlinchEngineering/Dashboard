import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBTGE_5_pMDsiocYexxVvpUAl4bd4mD7yc",
  authDomain: "shoutouts-3c57c.firebaseapp.com",
  databaseURL: "https://shoutouts-3c57c.firebaseio.com",
  projectId: "shoutouts-3c57c",
  storageBucket: "shoutouts-3c57c.appspot.com",
  messagingSenderId: "431061869764",
  appId: "1:431061869764:web:9f12d539f6d06145e11591",
  measurementId: "G-P8DK0KE0W0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}else {
  firebase.app();
}

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
