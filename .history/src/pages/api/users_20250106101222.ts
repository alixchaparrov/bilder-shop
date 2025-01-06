import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"; // Asegúrate de que prisma está correctamente configurado

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
  
    switch (method) {
      case "POST":
        try {
          // Obtén los datos enviados en el cuerpo del request
          const { name, email, role } = req.body;
  
          if (!name || !email || !role) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
          }
  
          // Crea un nuevo usuario en la base de datos
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
          return res.status(500).json({ error: "Error al crear usuario" });
        }
  
      case "GET":
        try {
          const users = await prisma.user.findMany({
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          });
          return res.status(200).json(users);
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
          return res.status(500).json({ error: "Error al obtener usuarios" });
        }
  
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({ error: `Método ${method} no permitido` });
    }
  }
