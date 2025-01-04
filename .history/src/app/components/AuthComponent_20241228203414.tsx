import { useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { FaGoogle } from "react-icons/fa";

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        role: "user",
      });
      alert("Registrierung erfolgreich!");
    } catch (error: any) {
      setErrorMessage(error.message || "Fehler bei der Registrierung.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
      }, { merge: true });
      alert("Mit Google angemeldet!");
    } catch (error: any) {
      setErrorMessage(error.message || "Fehler bei Google-Anmeldung.");
    } finally {
      setLoading(false);
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
      <button
        onClick={handleSignup}
        disabled={loading}
        className={`bg-green-600 text-white py-2 px-4 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Registrieren..." : "Registrieren"}
      </button>
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className={`bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center space-x-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <FaGoogle /> <span>{loading ? "Mit Google anmelden..." : "Mit Google anmelden"}</span>
      </button>
    </div>
  );
};

export default AuthComponent;
