import Unauthorized from "@/components/Unauthorized";

const AdminDashboard = () => {
  const user = useAuth();
  const hasAccess = user && user.role === "admin";

  if (!hasAccess) {
    return <Unauthorized />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {/* Contenido del dashboard */}
    </div>
  );
};

export default AdminDashboard;
