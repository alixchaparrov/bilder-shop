import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }

  const {
    vorname,
    nachname,
    email,
    passwort,
    handy,
    addresse,
    stadt,
    postleitzahl,
    land,
    rolle = "user",
    bevorzugteZahlungsmethode = "Kreditkarte", // Valor por defecto
  } = req.body;

  // Verifica que los campos obligatorios estén presentes
  if (!vorname || !nachname || !email || !passwort) {
    return res
      .status(400)
      .json({ error: "Vorname, Nachname, Email und Passwort sind erforderlich." });
  }

  try {
    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(passwort, 10);

    // Crea el usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        vorname,
        nachname,
        email,
        passwort: hashedPassword,
        handy,
        addresse,
        stadt,
        postleitzahl,
        land,
        rolle,
        bevorzugteZahlungsmethode,
        istAktiv: true, // Por defecto, el usuario está activo
      },
    });

    return res.status(201).json({ message: "Benutzer erfolgreich registriert.", user });
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    if (error.code === "P2002") {
      // Manejo de error único de Prisma para campos únicos (por ejemplo, email)
      return res.status(400).json({ error: "Die E-Mail-Adresse ist bereits registriert." });
    }

    return res.status(500).json({ error: "Interner Serverfehler." });
  }
}
