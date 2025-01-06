"use client";

import { useState, useEffect } from "react";
import { FaUser, FaBox, FaChartBar, FaMoon, FaSun } from "react-icons/fa";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("users");
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("user");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (currentView === "users") {
      fetchUsers();
    }
  }, [currentView]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vorname,
          nachname,
          email,
          handy,
          addresse,
          stadt,
          postleitzahl,
          land,
          role,
        }),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);
        alert("Usuario agregado con éxito");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCity("");
        setPostalCode("");
        setCountry("");
        setRole("user");
      } else {
        console.error("Error al agregar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "users":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-400 rounded-lg shadow-lg">
              <thead className="bg-gray-300 dark:bg-gray-800">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">Correo</th>
                  <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                  <th className="border border-gray-300 px-4 py-2">Dirección</th>
                  <th className="border border-gray-300 px-4 py-2">Ciudad</th>
                  <th className="border border-gray-300 px-4 py-2">Código Postal</th>
                  <th className="border border-gray-300 px-4 py-2">País</th>
                  <th className="border border-gray-300 px-4 py-2">Rol</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="bg-white dark:bg-gray-700">
                    <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.phone || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.address || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.city || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.postalCode || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.country || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <form onSubmit={handleAddUser} className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg space-y-4">
              <h3 className="text-lg font-bold text-center mb-4">Agregar Nuevo Usuario</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Ciudad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Código Postal"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="País"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="p-2 border rounded"
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
              >
                Agregar Usuario
              </button>
            </form>
          </div>
        );
      default:
        return <div>Selecciona una sección para gestionar.</div>;
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen`}
    >
      <header className="flex justify-between items-center p-4 bg-green-600 text-white">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">Kolumbianische Gemälde Dashboard</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-lg flex items-center bg-white text-green-600 hover:bg-green-700 hover:text-white"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />} {darkMode ? "Tema Claro" : "Tema Oscuro"}
        </button>
      </header>

      <nav className="flex justify-around bg-green-600 text-white py-4">
        <button
          onClick={() => setCurrentView("users")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentView === "users"
              ? "bg-white text-green-600"
              : "hover:bg-green-700"
          }`}
        >
          <FaUser size={20} /> <span>Usuarios</span>
        </button>
        <button
          onClick={() => setCurrentView("products")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentView === "products"
              ? "bg-white text-green-600"
              : "hover:bg-green-700"
          }`}
        >
          <FaBox size={20} /> <span>Productos</span>
        </button>
        <button
          onClick={() => setCurrentView("analytics")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentView === "analytics"
              ? "bg-white text-green-600"
              : "hover:bg-green-700"
          }`}
        >
          <FaChartBar size={20} /> <span>Analíticas</span>
        </button>
      </nav>

      <main className="p-6">{renderContent()}</main>

      <footer className="bg-gray-800 text-white text-center py-4">
        © 2025 Kolumbianische Gemälde. Todos los derechos reservados.
      </footer>
    </div>
  );
}
