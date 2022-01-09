import firebase from 'firebase/compat/app'
import "firebase/compat/database"
import "firebase/compat/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCxzLARsmcGGdDmrxGcxYR7VxHVR_ykTt8",
  authDomain: "recommandmenu.firebaseapp.com",
  projectId: "recommandmenu",
  databaseURL: 'https://recommandmenu-default-rtdb.firebaseio.com/',
  storageBucket: "recommandmenu.appspot.com",
  messagingSenderId: "926814137444",
  appId: "1:926814137444:web:3fc7d68021438a6fd30371",
  measurementId: "G-L6WJ9H7TEY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebase_db= firebase.database()

