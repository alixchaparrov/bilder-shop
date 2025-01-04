import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const router = useRouter();
  const user = useAuth(); // Simula obtener el usuario autenticado
  const hasAccess = user && user.role === role;

  if (!hasAccess) {
    router.push("/unauthorized");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
