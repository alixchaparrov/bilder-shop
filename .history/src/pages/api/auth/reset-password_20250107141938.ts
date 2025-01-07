import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }

  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Token y nueva contraseña son obligatorios." });
  }

  try {
    // Buscar al usuario por el token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gte: new Date(), // Asegura que el token no haya expirado
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Token inválido o expirado." });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar la contraseña y eliminar el token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    res.status(200).json({ message: "Contraseña actualizada exitosamente." });
  } catch (error) {
    console.error("Error actualizando contraseña:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
}
