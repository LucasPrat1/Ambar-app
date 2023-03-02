import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyCugwz_ePOf0_CDrF6TU0Iqbt3ZyylIwFk",
  authDomain: "ambar-3c67c.firebaseapp.com",
  projectId: "ambar-3c67c",
  storageBucket: "ambar-3c67c.appspot.com",
  messagingSenderId: "583769447004",
  appId: "1:583769447004:web:6d71f2e266e782eb266499"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp