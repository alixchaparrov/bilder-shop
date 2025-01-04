import { useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { FaGoogle } from "react-icons/fa";

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), { email, role: "user" });
      alert("Registrierung erfolgreich!");
    } catch (error) {
      setErrorMessage("Fehler bei der Registrierung: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert("Mit Google angemeldet!");
    } catch (error) {
      setErrorMessage("Fehler bei Google-Anmeldung: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <input
        type="email"
        placeholder="E-Mail eingeben"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-4 rounded-lg border"
      />
      <input
        type="password"
        placeholder="Passwort eingeben"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-4 rounded-lg border"
      />
      <button onClick={handleSignup} className="bg-green-600 text-white py-2 px-4 rounded-lg">
        Registrieren
      </button>
      <button onClick={handleGoogleLogin} className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
        <FaGoogle /> <span>Mit Google anmelden</span>
      </button>
    </div>
  );
};

export default AuthComponent;
