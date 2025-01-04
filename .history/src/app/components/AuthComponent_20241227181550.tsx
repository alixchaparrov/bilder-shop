// src/app/components/AuthComponent.tsx
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../lib/firebaseConfig';  // Importa la configuración de Firebase

// Tipos de datos para el estado del componente
interface AuthComponentState {
  email: string;
  password: string;
  isLogin: boolean;
  error: string;
}

const AuthComponent: React.FC = () => {
  const [state, setState] = useState<AuthComponentState>({
    email: '',
    password: '',
    isLogin: true, // True para Login, False para Registro
    error: '',
  });

  const auth = getAuth(app);

  // Manejar el cambio de campos de texto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // Función de registro
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, state.email, state.password);
      alert('erfolgreiche Registrierung');
    } catch (error: any) {
      setState({ ...state, error: error.message });
    }
  };

  // Función de inicio de sesión
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, state.email, state.password);
      alert('Erfolgreiche Anmeldung');
    } catch (error: any) {
      setState({ ...state, error: error.message });
    }
  };

  // Alternar entre Login y Registro
  const toggleLoginSignup = () => {
    setState({ ...state, isLogin: !state.isLogin, error: '' });
  };

  return (
    <div className="auth-container">
      <h2>{state.isLogin ? 'Anmelde' : 'Registrarse'}</h2>
      <form>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Ingresa tu email"
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
        <button type="button" onClick={state.isLogin ? handleLogin : handleSignup}>
          {state.isLogin ? 'Iniciar sesión' : 'Registrarse'}
        </button>
      </form>
      <p onClick={toggleLoginSignup} style={{ cursor: 'pointer' }}>
        {state.isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </p>
    </div>
  );
};

export default AuthComponent;
