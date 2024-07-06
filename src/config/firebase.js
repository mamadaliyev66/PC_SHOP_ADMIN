import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
  apiKey: "AIzaSyCVmRcw3AxLeLSp2IICK695cAQlv1oI3ns",
  authDomain: "kompyuteruz-b0f3a.firebaseapp.com",
  projectId: "kompyuteruz-b0f3a",
  storageBucket: "kompyuteruz-b0f3a.appspot.com",
  messagingSenderId: "859806496302",
  appId: "1:859806496302:web:0bbf5ede4b381cac3451bf",
  measurementId: "G-NBV70JGCZB",
  storageBucket: "kompyuteruz-b0f3a.appspot.com",


};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);

const app2=firebase.initializeApp(firebaseConfig)
const firestore = app2.firestore();

const auth = getAuth(app)

export { auth, storage,firestore, firebase ,app,db};