"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleEmailAuth = async () => {
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar información adicional en Firestore
        await setDoc(doc(db, "users", user.uid), { email: user.email, name, isAdmin: false });

        alert("Usuario registrado exitosamente.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Inicio de sesión exitoso.");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error.message);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDoc);

      // Si el usuario es nuevo, guardar información en Firestore
      if (!docSnap.exists()) {
        await setDoc(userDoc, { email: user.email, name: user.displayName, isAdmin: false });
      }

      alert("Inicio de sesión con Google exitoso.");
    } catch (error) {
      console.error("Error en Google Auth:", error.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>{isRegister ? "Registro" : "Inicio de Sesión"}</h1>
      {isRegister && (
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleEmailAuth}>
        {isRegister ? "Registrarse" : "Iniciar Sesión"}
      </button>
      <button onClick={handleGoogleAuth}>Iniciar Sesión con Google</button>
      <p onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "¿Ya tienes cuenta? Inicia Sesión" : "¿No tienes cuenta? Regístrate"}
      </p>
    </div>
  );
}
