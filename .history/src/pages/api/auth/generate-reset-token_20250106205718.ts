import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email }: { email: string } = req.body;

  if (!email) {
    return res.status(400).json({ error: "El correo electrónico es obligatorio." });
  }

  try {
    console.log("Buscando usuario con email:", email);

    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error("Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    console.log("Usuario encontrado:", user);

    // Generar token único
    const resetToken = uuidv4();
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hora de validez

    console.log("Token generado:", resetToken);

    // Actualizar el usuario con el token y su expiración
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpires },
    });

    console.log("Token almacenado en la base de datos");

    // Generar el enlace de restablecimiento
    const resetLink = `http://localhost:3000/update-password?token=${resetToken}`;
    console.log("Enlace generado:", resetLink);

    return res.status(200).json({
      message: "Enlace de restablecimiento generado con éxito.",
      resetLink,
    });
  } catch (error) {
    console.error("Error al generar el token:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}
