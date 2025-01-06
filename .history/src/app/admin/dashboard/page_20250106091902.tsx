"use client";

import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Navbar */}
      <nav className={`p-4 ${darkMode ? "bg-green-700" : "bg-green-600"} flex justify-between items-center`}>
        <h1 className="text-2xl font-bold">Kolumbianische Gemälde Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="flex items-center bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />} {darkMode ? " Helles Thema" : " Dunkles Thema"}
        </button>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold">User Management</h2>
            <p className="text-sm">Manage users, roles, and permissions.</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              View Users
            </button>
          </div>

          <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold">Product Management</h2>
            <p className="text-sm">Add, edit, and delete products.</p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Manage Products
            </button>
          </div>

          <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold">Analytics</h2>
            <p className="text-sm">View application analytics and reports.</p>
            <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
              View Reports
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`p-4 text-center ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
        <p>&copy; 2025 Kolumbianische Gemälde. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}
