// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjLQpieiT0z4U_M7pGN99y-vyqU0DEOds",
  authDomain: "kolumbianischegemmaelde.firebaseapp.com",
  projectId: "kolumbianischegemmaelde",
  storageBucket: "kolumbianischegemmaelde.firebasestorage.app",
  messagingSenderId: "469106886611",
  appId: "1:469106886611:web:90c2a31a8bad993ab3d126"
};

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializar la autenticación
const auth = getAuth(app);

export { auth };  // Exportar auth para su uso en otros archivos
