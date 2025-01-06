import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // Asegúrate de que prisma está correctamente configurado

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, email, role } = req.body;

      // Verifica si los datos están presentes
      if (!name || !email || !role) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }

      // Crea un nuevo usuario
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          role,
        },
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}
