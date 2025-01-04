import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Importa Firestore
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { useRouter } from "next/navigation"; // Importa useRouter desde 'next/navigation'

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isClient, setIsClient] = useState(false); // Estado para asegurarse de que el código se ejecute en el cliente

  // Solo se ejecutará en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter(); // Mover esto al cliente

  // Función para validar el correo
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
      router.push("/");  // Redirige a la página de inicio después del registro
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
      router.push("/");  // Redirige a la página de inicio después del login
    } catch (error) {
      setErrorMessage("Fehler bei der Anmeldung: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Erfolgreich mit Google angemeldet");
      router.push("/");  // Redirige a la página de inicio después del login con Google
    } catch (error) {
      setErrorMessage("Fehler bei der Anmeldung mit Google: " + error.message);
    }
  };

  // Evita que el componente se renderice en el servidor
  if (!isClient) return null;

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
