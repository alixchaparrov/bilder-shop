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
    const response = await client.create({
      _type: "user",
      email,
      password: hashedPassword,
      role: "user",
    });
    console.log("Usuario creado correctamente:", response);
  } catch (error: any) {
    console.error("Error al crear usuario:", {
      message: error.message || "Error desconocido",
      status: error?.response?.status || "N/A",
      data: error?.response?.data || "No hay datos adicionales",
    });
    throw new Error("No se pudo crear el usuario. Intenta nuevamente.");
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
