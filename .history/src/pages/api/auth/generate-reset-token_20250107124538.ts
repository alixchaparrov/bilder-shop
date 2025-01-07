import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "El correo electrónico es obligatorio." });
  }

  try {
    const resetToken = uuidv4();

    // Simulación: Guarda el token en una base de datos o realiza alguna acción.
    console.log(`Token generado para ${email}: ${resetToken}`);

    res.status(200).json({ message: "Token generado exitosamente.", token: resetToken });
  } catch (error) {
    console.error("Error al generar el token:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
}
