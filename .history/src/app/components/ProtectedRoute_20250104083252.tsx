import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children, role }: { children: ReactNode; role: string }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== role) {
      router.push("/unauthorized");
    }
  }, [user, router, role]);

  return <>{user && user.role === role && children}</>;
};

export default ProtectedRoute;
