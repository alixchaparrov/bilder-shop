import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }

  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || "user", // Si no se envía el rol, por defecto será "user"
      },
    });

    return res.status(201).json({ message: "Usuario registrado exitosamente", user });
  } catch (error: any) {
    console.error("Error al registrar usuario:", error);
    if (error.code === "P2002") {
      return res.status(409).json({ error: "El email ya está registrado." });
    }
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}
