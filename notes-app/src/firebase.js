import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDKLaK2gQaSeR9hc8yEyWUUtzK-GEcBxGg",
    authDomain: "notes-app-da5a2.firebaseapp.com",
    databaseURL: "https://notes-app-da5a2-default-rtdb.firebaseio.com",
    projectId: "notes-app-da5a2",
    storageBucket: "notes-app-da5a2.appspot.com",
    messagingSenderId: "696733965360",
    appId: "1:696733965360:web:625b60c9f5acfcfdf321f5",
    measurementId: "G-5HRWE2D203"

};
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);