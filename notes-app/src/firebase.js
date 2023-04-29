import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyDKLaK2gQaSeR9hc8yEyWUUtzK-GEcBxGg",
    authDomain: "notes-app-da5a2.firebaseapp.com",
    projectId: "notes-app-da5a2",
    storageBucket: "notes-app-da5a2.appspot.com",
    messagingSenderId: "696733965360",
    appId: "1:696733965360:web:da6d348ce7feb9b5f321f5",
    measurementId: "G-6Q4V1VZ7ER",
    databseURL: 'https://notes-app-da5a2-default-rtdb.firebaseio.com/'

};

export const app = initializeApp(firebaseConfig);