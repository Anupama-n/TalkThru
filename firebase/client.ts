// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCR7g8q29Z2rgaPRdWq2Ir40ZNN0fw5Qo4",
    authDomain: "talkthru-e2fdd.firebaseapp.com",
    projectId: "talkthru-e2fdd",
    storageBucket: "talkthru-e2fdd.firebasestorage.app",
    messagingSenderId: "124761311207",
    appId: "1:124761311207:web:98fc793374b44233db5f42",
    measurementId: "G-1JD39BJK60"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);