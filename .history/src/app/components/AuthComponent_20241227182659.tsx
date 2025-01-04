// src/app/components/AuthComponent.tsx
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";  // Importar auth desde firebaseConfig

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);  // True para Login, False para Registro
  const [error, setError] = useState("");

  // Función de registro
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registro exitoso");
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Función de inicio de sesión
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Inicio de sesión exitoso");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
    setError("");  // Limpiar errores al cambiar entre login y signup
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Iniciar sesión" : "Registrarse"}</h2>
      <form>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email"
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="button" onClick={isLogin ? handleLogin : handleSignup}>
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </button>
      </form>
      <p onClick={toggleLoginSignup} style={{ cursor: "pointer" }}>
        {isLogin
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia sesión"}
      </p>
    </div>
  );
};

export default AuthComponent;
