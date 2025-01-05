"use client";

import { createContext, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

interface AuthContextType {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  } | null;
  login: (provider?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const login = (provider = "credentials") => {
    signIn(provider); // Puedes especificar el proveedor o dejar el predeterminado
  };

  const logout = () => {
    signOut();
  };

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        role: (session.user as any).role || null, // Si incluyes roles en el token
      }
    : null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
