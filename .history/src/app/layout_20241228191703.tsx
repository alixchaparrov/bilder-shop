"use client";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="de" className={darkMode ? "dark" : ""}>
      <head>
        <title>Kolumbianische Gemälde</title>
        <meta
          name="description"
          content="Galerie von kolumbianischen Landschaftsgemälden. Entdecken Sie die Schönheit Kolumbiens durch unsere einzigartigen Kunstwerke."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-background text-foreground">
        <header className="p-4 bg-primary flex justify-between items-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-800"
          >
            {darkMode ? "Helles Modus" : "Dunkles Modus"}
          </button>
        </header>
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}
