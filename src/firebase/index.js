import firebase from "firebase/compat/app";
import config from './config.json';

const firebaseConfig = config;

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp