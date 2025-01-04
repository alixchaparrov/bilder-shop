// src/app/components/AdminDashboard.tsx

import { useState, useEffect } from "react";
import { db } from "@/lib/firebaseConfig"; // Asegúrate de importar correctamente db
import { updateDoc, doc, getDocs, collection } from "firebase/firestore"; 

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Función para obtener los usuarios
  const getUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));
      setUsers(userList);
    } catch (err) {
      setError("Error al obtener usuarios: " + err.message);
    }
  };

  // Función para cambiar el rol a admin
  const makeAdmin = async (userUID: string) => {
    try {
      const userRef = doc(db, "users", userUID);
      await updateDoc(userRef, {
        role: "admin", // Cambiar el rol a admin
      });
      alert("Rol de usuario actualizado a admin");
      getUsers(); // Volver a cargar los usuarios
    } catch (error) {
      setError("Error al actualizar el rol: " + error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="user-list">
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <div>{user.data.email} - {user.data.role}</div>
              <button
                onClick={() => makeAdmin(user.id)}
                className="btn-admin"
              >
                Make Admin
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
