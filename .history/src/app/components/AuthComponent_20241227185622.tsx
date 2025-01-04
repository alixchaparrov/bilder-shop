import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig"; // Asegúrate de que esto esté correctamente importado

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Funktion zur Überprüfung der E-Mail-Adresse
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    setErrorMessage(""); // Fehlernachricht löschen

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Erfolgreich registriert");
    } catch (error) {
      setErrorMessage("Fehler bei der Registrierung: " + error.message);
    }
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    setErrorMessage(""); // Fehlernachricht löschen

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Erfolgreich angemeldet");
    } catch (error) {
      setErrorMessage("Fehler bei der Anmeldung: " + error.message);
    }
  };

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
      )}
      <input
        type="email"
        placeholder="E-Mail eingeben"
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passwort eingeben"
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between">
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Anmelden
        </button>
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Registrieren
        </button>
      </div>
    </div>
  );
};

export default AuthComponent;
