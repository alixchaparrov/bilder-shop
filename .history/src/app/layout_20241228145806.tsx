"use client";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <title>Kolumbianische Gemälde</title>
        <meta
          name="description"
          content="Galerie von kolumbianischen Landschaftsgemälden. Entdecken Sie die Schönheit Kolumbiens durch unsere einzigartigen Kunstwerke."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}