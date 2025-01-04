import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjLQpieiT0z4U_M7pGN99y-vyqU0DEOds",
  authDomain: "kolumbianischegemmaelde.firebaseapp.com",
  projectId: "kolumbianischegemmaelde",
  storageBucket: "kolumbianischegemmaelde.firebasestorage.app",
  messagingSenderId: "469106886611",
  appId: "1:469106886611:web:90c2a31a8bad993ab3d126",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configurar persistencia para evitar problemas con cookies de terceros
setPersistence(auth, browserSessionPersistence).catch((error) => {
  console.error("Error configurando persistencia de sesión:", error);
});

// Inicializar Firestore
const db = getFirestore(app);

export { auth, db };
