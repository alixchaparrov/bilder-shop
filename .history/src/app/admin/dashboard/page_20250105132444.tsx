import { useAuth } from ".context/AuthContext";
import { useRouter } from "next/navigation"; // Usar `next/navigation` en lugar de `next/router`
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/"); // Redirige a la página principal si no es admin
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return <p>Loading...</p>; // Muestra un cargador mientras verifica
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      {/* Aquí puedes agregar las funcionalidades del panel de administración */}
    </div>
  );
}
