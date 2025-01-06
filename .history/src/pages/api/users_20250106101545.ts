import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"; // Asegúrate de que prisma está correctamente configurado

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
  
    switch (method) {
      case "GET":
        try {
          const users = await prisma.user.findMany(); // Obtiene todos los usuarios
          return res.status(200).json(users);
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
          return res.status(500).json({ error: "Error al obtener usuarios." });
        }
  
      case "POST":
        try {
          if (!req.body) {
            return res.status(400).json({ error: "El cuerpo del request está vacío." });
          }
  
          const { name, email, role } = req.body;
  
          if (!name || !email || !role) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
          }
  
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
          return res.status(500).json({ error: "Error al crear usuario." });
        }
  
      case "PUT":
        try {
          const { id, name, email, role } = req.body;
  
          if (!id || !name || !email || !role) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
          }
  
          const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, role },
          });
  
          return res.status(200).json(updatedUser);
        } catch (error) {
          console.error("Error al actualizar usuario:", error);
          return res.status(500).json({ error: "Error al actualizar usuario." });
        }
  
      case "DELETE":
        try {
          const { id } = req.query;
  
          if (!id) {
            return res.status(400).json({ error: "El ID del usuario es obligatorio." });
          }
  
          await prisma.user.delete({
            where: { id: Number(id) },
          });
  
          return res.status(204).end();
        } catch (error) {
          console.error("Error al eliminar usuario:", error);
          return res.status(500).json({ error: "Error al eliminar usuario." });
        }
  
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Método ${method} no permitido` });
    }
  }