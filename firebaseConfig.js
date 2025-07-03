// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// 🔐 Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBk4DEhpSsakwZdumaWS6AO0Lre2CPuicU",
  authDomain: "contafacil-ca62a.firebaseapp.com",
  projectId: "contafacil-ca62a",
  storageBucket: "contafacil-ca62a.appspot.com",
  messagingSenderId: "515706577788",
  appId: "1:515706577788:web:d2425fd6a74ce81acc3af9",
  measurementId: "G-L9Z5T75H9K"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta Firestore e Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
