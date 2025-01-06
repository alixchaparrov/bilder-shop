"use client";

import { useState } from "react";
import { FaUser, FaBox, FaChartBar, FaMoon, FaSun } from "react-icons/fa";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("users");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderContent = () => {
    switch (currentView) {
      case "users":
        return <div>Benutzerverwaltung: Hier können Benutzer hinzugefügt, bearbeitet oder gelöscht werden.</div>;
      case "products":
        return <div>Produktverwaltung: Hier können Produkte hinzugefügt, bearbeitet oder gelöscht werden.</div>;
      case "analytics":
        return <div>Analysen: Hier können Sie Berichte und Analysen einsehen.</div>;
      default:
        return <div>Wählen Sie einen Bereich aus, den Sie verwalten möchten.</div>;
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}> 
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-green-600 text-white">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">Kolumbianische Gemälde Dashboard</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-lg flex items-center bg-white text-green-600 hover:bg-green-700 hover:text-white"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />} {darkMode ? " Helles Thema" : " Dunkles Thema"}
        </button>
      </header>

      {/* Navigation */}
      <nav className="flex justify-around bg-green-600 text-white py-4">
        <button
          onClick={() => setCurrentView("users")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${currentView === "users" ? "bg-white text-green-600" : "hover:bg-green-700"}`}
        >
          <FaUser size={20} /> <span>Benutzer</span>
        </button>
        <button
          onClick={() => setCurrentView("products")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${currentView === "products" ? "bg-white text-green-600" : "hover:bg-green-700"}`}
        >
          <FaBox size={20} /> <span>Produkte</span>
        </button>
        <button
          onClick={() => setCurrentView("analytics")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${currentView === "analytics" ? "bg-white text-green-600" : "hover:bg-green-700"}`}
        >
          <FaChartBar size={20} /> <span>Analysen</span>
        </button>
      </nav>

      {/* Content */}
      <main className="p-6">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2025 Kolumbianische Gemälde. Alle Rechte vorbehalten.
      </footer>
    </div>
  );
}
