import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import rebase from 're-base';


// Initialize Firebase
const app = firebase.initializeApp({
    apiKey: "AIzaSyCRMj4lVnKuOkxBz2FBTDbMsc5LeEyWfvs",
    authDomain: "notetaker59275.firebaseapp.com",
    databaseURL: "https://notetaker59275.firebaseio.com",
    projectId: "notetaker59275",
    storageBucket: "notetaker59275.appspot.com",
    messagingSenderId: "1087085033228"
});

export const auth = firebase.auth();

//getting providers
export const gitHubAuthProvider = new firebase.auth.GithubAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

//initializing rebase
const db = firebase.database(app);
const rebaseObj = rebase.createClass(db);

export default rebaseObj;