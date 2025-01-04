"use client"
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const AuthModalContent = ({ onClose }: { onClose: () => void }) => {
  const { login, register, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(email, password);
        alert("Benutzer erfolgreich registriert");
      } else {
        await login(email, password);
      }
      onClose();
  
      if (user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Registrieren" : "Login"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegistering ? "Registrieren" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Haben Sie schon eine Account?" : "Haben Sie noch keine...? Registrieren Sie sich bitte"}
      </button>
    </div>
  );
};

export default AuthModalContent;
