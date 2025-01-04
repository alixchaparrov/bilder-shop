import ProtectedRoute from "@/app/components/ProtectedRoute";

const AdminDashboard = () => {
  return (
    <ProtectedRoute role="admin">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Willkommen im Administrationsbereich!</p>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
