// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";  // Para Firestore, si lo necesitas

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjLQpieiT0z4U_M7pGN99y-vyqU0DEOds",
  authDomain: "kolumbianischegemmaelde.firebaseapp.com",
  projectId: "kolumbianischegemmaelde",
  storageBucket: "kolumbianischegemmaelde.firebasestorage.app",
  messagingSenderId: "469106886611",
  appId: "1:469106886611:web:90c2a31a8bad993ab3d126"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar la autenticación y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };  // Exportar auth y db para su uso en otros archivos
