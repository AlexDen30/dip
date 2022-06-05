import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const fbConfig = {
    apiKey: "AIzaSyASv4CRh4AYNrxTyedpmBcJQnE08TX1blM",
    authDomain: "palleting-cdf00.firebaseapp.com",
    projectId: "palleting-cdf00",
    storageBucket: "palleting-cdf00.appspot.com",
    messagingSenderId: "434335945577",
    appId: "1:434335945577:web:68e249b32f8242ab6863f8"
}

const app = initializeApp(fbConfig)

export const firebase = app
export const firebaseDB = getFirestore(app)
export const firebaseAuth = getAuth(app)