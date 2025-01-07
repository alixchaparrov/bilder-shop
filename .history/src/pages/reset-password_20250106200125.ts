import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email }: { email: string } = req.body;

  if (!email) {
    return res.status(400).json({ error: "El correo electrónico es obligatorio." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const resetToken = uuidv4();
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hora

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpires },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    res.status(200).json({ message: "Enlace de restablecimiento generado con éxito.", resetLink });
  } catch (error) {
    console.error("Error al generar el token:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
}
