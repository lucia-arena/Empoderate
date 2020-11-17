//componente para configurar la base de datos
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBEuAH8HxokVrWyN_aHddBKlEE-cL8R10w",
  authDomain: "empoderate-c259a.firebaseapp.com",
  databaseURL: "https://empoderate-c259a.firebaseio.com",
  projectId: "empoderate-c259a",
  storageBucket: "empoderate-c259a.appspot.com",
  messagingSenderId: "12870830342",
  appId: "1:12870830342:web:d135563d73e08213c8f687",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
