import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth"; // Implementa un contexto de autenticación

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login"); // Redirige al inicio de sesión si no está autenticado
      } else if (adminOnly && user.role !== "admin") {
        router.push("/unauthorized"); // Redirige si no es administrador
      }
    }
  }, [user, loading, adminOnly, router]);

  if (loading) {
    return <div>Überprüfe Benutzer...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
