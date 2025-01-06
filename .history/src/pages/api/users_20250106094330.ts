import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/"; // Ajusta según tu estructura de proyecto

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET":
        // Obtener todos los usuarios
        const users = await prisma.user.findMany(); // Asegúrate de que `user` existe en tu modelo de Prisma
        res.status(200).json(users);
        break;

      case "DELETE":
        // Eliminar un usuario por ID
        const { id } = req.query;
        if (!id || typeof id !== "string") {
          res.status(400).json({ error: "ID de usuario no proporcionado o inválido" });
          return;
        }
        await prisma.user.delete({ where: { id: Number(id) } });
        res.status(200).json({ message: "Usuario eliminado con éxito" });
        break;

      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
