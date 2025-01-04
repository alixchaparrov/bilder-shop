import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const { user } = useAuth(); // Obtenemos el usuario autenticado
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si no hay usuario, redirige
    if (!user) {
      router.push("/unauthorized");
    } else if (user.role !== role) {
      // Si el rol no coincide, redirige a página no autorizada
      router.push("/unauthorized");
    } else {
      // Si pasa todas las condiciones, se permite acceder
      setLoading(false);
    }
  }, [user, role, router]);

  // Muestra una pantalla de carga mientras se verifica al usuario
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
