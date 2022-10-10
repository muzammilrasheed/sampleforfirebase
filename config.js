import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4AYo0WoTKYkWmCsI8Yqyf6ZDftLJJsgg",
    authDomain: "testproject-581db.firebaseapp.com",
    projectId: "testproject-581db",
    storageBucket: "testproject-581db.appspot.com",
    messagingSenderId: "42246589047",
    appId: "1:42246589047:web:d7347f0babc69878fd5472",
    measurementId: "G-VJ2BJ1QF50"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);