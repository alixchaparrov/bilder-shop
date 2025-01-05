import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

eexport default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Cuerpo recibido:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    console.error("Email o contraseña faltantes");
    return res.status(400).json({ error: "Email y contraseña son requeridos." });
  }

  try {
    console.log("Buscando usuario con email:", email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("Usuario encontrado:", user);

    if (!user) {
      console.error("Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("¿Contraseña válida?:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    return res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}
