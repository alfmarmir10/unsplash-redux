// import firebase from 'firebase/compat/app';
// // import {auth, GoogleAuthProvider} from 'firebase/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/auth'; //v9


// const firebaseConfig = {
//     apiKey: "AIzaSyBvqG_-HFre5zeaQxBM4fcGm9n5-UpjxNA",
//     authDomain: "unsplash-redux.firebaseapp.com",
//     projectId: "unsplash-redux",
//     storageBucket: "unsplash-redux.appspot.com",
//     messagingSenderId: "82726771133",
//     appId: "1:82726771133:web:3b50c29778219de6e51ad4",
//     measurementId: "G-TG4R0XFFPM"
//   };

// const firebaseapp = firebase.initializeApp(firebaseConfig);
// const googleProvider = new firebase.auth.GoogleAuthProvider();
// const authInstance = firebase.auth();

// export {googleProvider, firebase, authInstance};

import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBvqG_-HFre5zeaQxBM4fcGm9n5-UpjxNA",
    authDomain: "unsplash-redux.firebaseapp.com",
    projectId: "unsplash-redux",
    storageBucket: "unsplash-redux.appspot.com",
    messagingSenderId: "82726771133",
    appId: "1:82726771133:web:3b50c29778219de6e51ad4",
    measurementId: "G-TG4R0XFFPM"
  };
// console.log("Pasó por aquí.");
const firebaseapp = initializeApp(firebaseConfig);

export default firebaseapp;

