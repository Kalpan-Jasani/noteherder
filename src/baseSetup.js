import firebase from 'firebase';
import rebase from 're-base';
// Initialize Firebase
const config = 
{
    apiKey: "AIzaSyCRMj4lVnKuOkxBz2FBTDbMsc5LeEyWfvs",
    authDomain: "notetaker59275.firebaseapp.com",
    databaseURL: "https://notetaker59275.firebaseio.com",
    projectId: "notetaker59275",
    storageBucket: "notetaker59275.appspot.com",
    messagingSenderId: "1087085033228"
};

const app = firebase.initializeApp(config);
const db = firebase.database(app);
const rebaseObj = rebase.createClass(db);

export default rebaseObj;