import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";

interface User {
  id: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = collection(db, "users");
        const userDocs = await getDocs(userCollection);
        const fetchedUsers = userDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setUsers(fetchedUsers);
      } catch (err) {
        console.error("Error fetching users: ", err);
        setError("Fehler beim Laden der Benutzer.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Lädt Benutzer...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="p-2 border-b border-gray-300">
              <span className="font-semibold">{user.email}</span> - Rolle: {user.role}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Keine Benutzer gefunden.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
