import { createContext, useContext, useState, useEffect } from "react";
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    const query = `*[_type == "user" && email == $email][0]`;
    const result = await client.fetch(query, { email });

    if (!result || !(await bcrypt.compare(password, result.password))) {
      throw new Error("Password ist falsch");
    }

    setUser({ email: result.email, role: result.role });
  };

  const register = async (email: string, password: string) => {
    try 7
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.create({
      _type: "user",
      email,
      password: hashedPassword,
      role: "user",
    });
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
