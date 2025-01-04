import { createContext, useContext, useState } from "react";
import client from "@/lib/sanity";
import bcrypt from "bcryptjs";

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

  const login = async (email: string, password: string): Promise<void> => {
    const query = `*[_type == "user" && email == $email][0]`;
    const result: { email: string; password: string; role: string } | null = await client.fetch(query, { email });

    if (!result || !(await bcrypt.compare(password, result.password))) {
        throw new Error("Password ist falsch");
    }

    setUser({ email: result.email, role: result.role });
};


  const register = async (email: string, password: string): Promise<void> => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response: { _id: string; email: string; role: string } = await client.create({
            _type: "user",
            email,
            password: hashedPassword,
            role: "user",
        });
        console.log("Usuario creado correctamente:", response);
    } catch (error: unknown) {
      console.error("Error al crear usuario:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
        throw new Error("No se pudo crear el usuario. Verifica los datos e inténtalo de nuevo.");
    }
};


  const logout = () => setUser(null);

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
