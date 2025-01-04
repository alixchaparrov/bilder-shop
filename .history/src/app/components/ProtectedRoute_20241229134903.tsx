import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || user.role !== role) {
    router.push("/unauthorized"); // Redirige a una página de acceso denegado
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
