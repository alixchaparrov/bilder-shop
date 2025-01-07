import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt"; // Asegúrate de instalar bcrypt si no lo tienes
import "react-toastify/dist/ReactToastify.css";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
      }
      break;

    case "POST":
      const { name, email, password, role } = req.body;

      try {
        const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role: role || "user",
          },
        });
        res.status(201).json(newUser);
      } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: "Error al crear el usuario" });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const { name, email, role } = req.body;

        const updatedUser = await prisma.user.update({
          where: { id: Number(id) },
          data: { name, email, role },
        });
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: "Error al actualizar usuario" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        await prisma.user.delete({
          where: { id: Number(id) },
        });
        res.status(200).json({ message: "Usuario eliminado con éxito" });
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
