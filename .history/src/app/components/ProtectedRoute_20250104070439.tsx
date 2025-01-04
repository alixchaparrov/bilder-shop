import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Usuario:", user); // <-- Log para depurar
    console.log("Rol requerido:", role); // <-- Log para depurar

    if (!user) {
      router.push("/unauthorized");
    } else if (user.role !== role) {
      router.push("/unauthorized");
    } else {
      setLoading(false);
    }
  }, [user, role, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
