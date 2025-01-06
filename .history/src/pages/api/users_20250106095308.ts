import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"; // Asegúrate de que esta ruta coincida con la configuración de tu proyecto

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET":
        // Obtener todos los usuarios
        const users = await prisma.user.findMany();
        res.status(200).json(users);
        break;

      case "POST":
        // Crear un nuevo usuario
        const { name, email, role } = req.body;

        // Validar los datos recibidos
        if (!name || !email || !role) {
          res.status(400).json({ error: "Faltan datos necesarios para crear el usuario" });
          return;
        }

        // Crear usuario en la base de datos
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            role,
          },
        });
        res.status(201).json(newUser);
        break;

      case "DELETE":
        // Eliminar un usuario por ID
        const { id } = req.query;

        // Validar el ID
        if (!id || typeof id !== "string") {
          res.status(400).json({ error: "ID de usuario no proporcionado o inválido" });
          return;
        }

        // Eliminar usuario en la base de datos
        await prisma.user.delete({
          where: { id: Number(id) },
        });
        res.status(200).json({ message: "Usuario eliminado con éxito" });
        break;

      default:
        // Método no permitido
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
  } catch (error) {
    console.error("Error en el endpoint /api/users:", error);
    res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
}
