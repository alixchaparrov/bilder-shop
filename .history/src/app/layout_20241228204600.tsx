"use client";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="de">
      <head>
        <title>Kolumbianische Gemälde</title>
        <meta
          name="description"
          content="Galerie von kolumbianischen Landschaftsgemälden. Entdecken Sie die Schönheit Kolumbiens durch unsere einzigartigen Kunstwerke."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-background text-foreground font-sans">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnFocusLoss pauseOnHover />
        <header className="bg-primary text-white p-4 shadow-md sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Kolumbianische Gemälde</h1>
          </div>
        </header>
        <main className="container mx-auto py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
          © {currentYear} Kolumbianische Gemälde. Mit Leidenschaft entwickelt von Alix Chaparro.
        </footer>
      </body>
    </html>
  );
}
