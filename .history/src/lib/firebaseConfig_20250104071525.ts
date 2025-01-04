// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjLQpieiT0z4U_M7pGN99y-vyqU0DEOds",
  authDomain: "kolumbianischegemmaelde.firebaseapp.com",
  projectId: "kolumbianischegemmaelde",
  storageBucket: "kolumbianischegemmaelde.firebasestorage.app",
  messagingSenderId: "469106886611",
  appId: "1:469106886611:web:90c2a31a8bad993ab3d126"
};

// Inicializar servicios
const app = initializeApp(firebaseConfig);
setPersistence(auth, browserSessionPersistence);
export const auth = getAuth(app);
export const db = getFirestore(app);


