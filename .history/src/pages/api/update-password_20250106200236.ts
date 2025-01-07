import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }

  const { token, password }: { token: string; password: string } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Token y contraseña son requeridos." });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Token inválido o expirado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    res.status(200).json({ message: "Contraseña actualizada con éxito." });
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
}
