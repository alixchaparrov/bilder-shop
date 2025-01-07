import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "El correo electrónico es obligatorio." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado." });

    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + 3600000); // Expira en 1 hora

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpires: expiresAt },
    });

    const resetLink = `http://localhost:3000/update-password?token=${resetToken}`;
    res.status(200).json({ resetLink });
  } catch (error) {
    console.error("Error generando el token:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
}

