"use client";

import "./globals.css";
import { AuthProvider } from "../..";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <title>Kolumbianische Gemälde</title>
        <meta
          name="description"
          content="Galerie von kolumbianischen Landschaftsgemälden. Entdecken Sie die Schönheit Kolumbiens durch unsere einzigartigen Kunstwerke."
        />
        <meta
          name="keywords"
          content="Kolumbianische Kunst, Landschaftsgemälde, Gemälde kaufen"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
