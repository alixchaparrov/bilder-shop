import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirige al usuario si no está autenticado
    }
  }, [user, router]);

  if (!user) {
    return null; // O muestra un cargador mientras redirige
  }

  return <>{children}</>;
}
