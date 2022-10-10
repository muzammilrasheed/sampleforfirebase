import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { app, db } from "./config.js"
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
let email = document.querySelector("#email");
let password = document.querySelector("#password");



let signup = document.querySelector("#signup");
signup.addEventListener("click", signupUser);

const auth = getAuth(app);

function signupUser() {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            verifyemail()
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });
}


function verifyemail() {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            // Email verification sent!
            // ...
        });
}



let login = document.querySelector("#login");
login.addEventListener("click", loginuser);

function loginuser() {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });

}

let logout = document.querySelector("#logout");
logout.addEventListener("click", logoutuser);

function logoutuser() {
    signOut(auth).then(() => {
        console.log("Sign-out successful");
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}



onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});



let addTodo = document.querySelector("#addTodo");
addTodo.addEventListener("click", addTodoinFirebase);
let todo = document.querySelector("#todo");

async function addTodoinFirebase() {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            todo: todo.value,

        });
        dataFromFirbase()
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

let todoist = document.querySelector("#todoist");
async function dataFromFirbase() {
    todoist.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        todoist.innerHTML = todoist.innerHTML + `<li id=${doc.id}>${doc.data().todo}</li>`
    });
}