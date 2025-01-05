import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"; // Instala js-cookie si no lo tienes: npm install js-cookie

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

  useEffect(() => {
    // Recuperar usuario desde cookies al cargar la página
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await fetch("/api/auth/nextauth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al iniciar sesión.");
    }

    const data = await response.json();
    setUser(data.user);

    // Guardar usuario en cookies
    Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error desconocido");
    }
  
    const data = await response.json();
    setUser({ name: data.user.name, email: data.user.email, role: data.user.role });
  };
  

  const logout = () => {
    setUser(null);
    Cookies.remove("user"); // Eliminar cookies
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider.");
  }
  return context;
};
