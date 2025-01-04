"use client";

import "./globals.css";
import { useState, useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  // Cambiar dinámicamente la clase del HTML
  useEffect(() => {
    const rootElement = document.documentElement;
    if (darkMode) {
      rootElement.classList.add("dark");
    } else {
      rootElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <html lang="de">
      <head>
        <title>Kolumbianische Gemälde</title>
        <meta name="description" content="Galerie von kolumbianischen Landschaftsgemälden." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-background text-foreground font-sans">
        <nav className="flex justify-end p-4 bg-primary text-white">
          <button
            className="btn-secondary px-4 py-2 rounded-lg hover:bg-secondary-dark"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
          </button>
        </nav>
        {children}
      </body>
    </html>
  );
}
