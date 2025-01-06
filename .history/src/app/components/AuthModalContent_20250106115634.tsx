"use client";

import { useState, useEffect } from "react";
import { FaUser, FaBox, FaChartBar, FaMoon, FaSun } from "react-icons/fa";
import AuthModal from "../components/AuthModalContent";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("users");
  const [users, setUsers] = useState([]);
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [handy, setHandy] = useState("");
  const [addresse, setAddresse] = useState("");
  const [stadt, setStadt] = useState("");
  const [postleitzahl, setPostleitzahl] = useState("");
  const [land, setLand] = useState("");
  const [rolle, setRolle] = useState("user");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
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
          rolle,
        }),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);
        alert("Benutzer erfolgreich hinzugefügt");
        setVorname("");
        setNachname("");
        setEmail("");
        setHandy("");
        setAddresse("");
        setStadt("");
        setPostleitzahl("");
        setLand("");
        setRolle("user");
      } else {
        console.error("Error beim Hinzufügen des Benutzers:", response.statusText);
      }
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Benutzers:", error);
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
                  <th className="border border-gray-300 px-4 py-2">Vorname</th>
                  <th className="border border-gray-300 px-4 py-2">Nachname</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Handy</th>
                  <th className="border border-gray-300 px-4 py-2">Addresse</th>
                  <th className="border border-gray-300 px-4 py-2">Stadt</th>
                  <th className="border border-gray-300 px-4 py-2">Postleitzahl</th>
                  <th className="border border-gray-300 px-4 py-2">Land</th>
                  <th className="border border-gray-300 px-4 py-2">Rolle</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="bg-white dark:bg-gray-700">
                    <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.vorname}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.nachname}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.handy || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.addresse || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.stadt || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.postleitzahl || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.land || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.rolle}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <form onSubmit={handleAddUser} className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg space-y-4">
              <h3 className="text-lg font-bold text-center mb-4">Neuen Benutzer hinzufügen</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Vorname"
                  value={vorname}
                  onChange={(e) => setVorname(e.target.value)}
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Nachname"
                  value={nachname}
                  onChange={(e) => setNachname(e.target.value)}
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Handy"
                  value={handy}
                  onChange={(e) => setHandy(e.target.value)}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Addresse"
                  value={addresse}
                  onChange={(e) => setAddresse(e.target.value)}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Stadt"
                  value={stadt}
                  onChange={(e) => setStadt(e.target.value)}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Postleitzahl"
                  value={postleitzahl}
                  onChange={(e) => setPostleitzahl(e.target.value)}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Land"
                  value={land}
                  onChange={(e) => setLand(e.target.value)}
                  className="p-2 border rounded"
                />
                <select
                  value={rolle}
                  onChange={(e) => setRolle(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="user">Benutzer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
              >
                Benutzer hinzufügen
              </button>
            </form>
          </div>
        );
      default:
        return <div>Wählen Sie einen Bereich zur Verwaltung aus.</div>;
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
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />} {darkMode ? "Helles Thema" : "Dunkles Thema"}
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
          <FaUser size={20} /> <span>Benutzer</span>
        </button>
        <button
          onClick={() => setCurrentView("products")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentView === "products"
              ? "bg-white text-green-600"
              : "hover:bg-green-700"
          }`}
        >
          <FaBox size={20} /> <span>Produkte</span>
        </button>
        <button
          onClick={() => setCurrentView("analytics")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentView === "analytics"
              ? "bg-white text-green-600"
              : "hover:bg-green-700"
          }`}
        >
          <FaChartBar size={20} /> <span>Analytik</span>
        </button>
      </nav>

      <main className="p-6">{renderContent()}</main>

      <footer className="bg-gray-800 text-white text-center py-4">
        © 2025 Kolumbianische Gemälde. Alle Rechte vorbehalten.
      </footer>

      {/* Modal für Authentifizierung */}
      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </div>
  );
}
