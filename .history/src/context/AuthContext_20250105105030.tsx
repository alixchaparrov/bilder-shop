import { createContext, useContext, useState } from "react";

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Login usando la API `/api/auth/login`
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch("/api/auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Error al iniciar sesión.");
      }

      const userData: User = await response.json();
      setUser(userData); // Guarda los datos del usuario autenticado
    } catch (error: any) {
      console.error("Error durante el inicio de sesión:", error.message);
      throw new Error(error.message || "Error desconocido.");
    }
  };

  // Registro usando la API `/api/auth/register`
  const register = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Error al registrar usuario.");
      }

      alert("Usuario registrado exitosamente.");
    } catch (error: any) {
      console.error("Error durante el registro:", error.message);
      throw new Error(error.message || "Error desconocido.");
    }
  };

  // Logout: Limpia el estado local
  const logout = (): void => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider.");
  }
  return context;
};
