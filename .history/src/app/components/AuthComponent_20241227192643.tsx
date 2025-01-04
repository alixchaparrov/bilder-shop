import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig"; 
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 

const AuthComponent = ({ setShowModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Función para validar la dirección de correo
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    setErrorMessage(""); // Limpiar el mensaje de error

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Erfolgreich registriert");
      setShowModal(false);  // Cerrar el modal después de la registración
    } catch (error) {
      setErrorMessage("Fehler bei der Registrierung: " + error.message);
    }
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    setErrorMessage(""); // Limpiar el mensaje de error

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Erfolgreich angemeldet");
      setShowModal(false);  // Cerrar el modal después del login
    } catch (error) {
      setErrorMessage("Fehler bei der Anmeldung: " + error.message);
    }
  };

  // Función para iniciar sesión con Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Erfolgreich mit Google angemeldet");
      setShowModal(false);  // Cerrar el modal después de login con Google
    } catch (error) {
      setErrorMessage("Fehler bei der Anmeldung mit Google: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
      )}
      <input
        type="email"
        placeholder="E-Mail eingeben"
        className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passwort eingeben"
        className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between gap-4">
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 active:scale-95 shadow-sm"
        >
          Anmelden
        </button>
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 active:scale-95 shadow-sm"
        >
          Registrieren
        </button>
      </div>
      {/* Botón de Google */}
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition duration-300"
      >
        <FaGoogle size={20} />
        <span>Anmelden mit Google</span>
      </button>
    </div>
  );
};

export default AuthComponent;
