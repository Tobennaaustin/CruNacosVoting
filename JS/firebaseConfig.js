// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCeKQOD-GrJOIos8m-J-mrXHqwg1WyPT-g",
  authDomain: "cru-nacos-vote.firebaseapp.com",
  projectId: "cru-nacos-vote",
  storageBucket: "cru-nacos-vote.appspot.com",
  messagingSenderId: "771005751339",
  appId: "1:771005751339:web:dcb783f1e35f7d65b8ca6e",
  measurementId: "G-MXTZ1LFZ1T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
