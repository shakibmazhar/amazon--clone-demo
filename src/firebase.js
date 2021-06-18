import firebase from "firebase";
import config from "./firebaseConfig";

//Firebase config
const firebaseConfig = config;

//Initialize firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);

//Initialize DB
const db = firebaseApp.firestore();

//Authentication
const auth = firebase.auth();

export { db, auth };
