import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/unauthorized");
    } else if (user.role !== role) {
      router.push("/unauthorized");
    }
  }, [user, role, router]);

  if (!user || user.role !== role) {
    return null; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
