import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

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
      const {
    
        email,
        password,
        phone,
        address,
        city,
        postalCode,
        country,
        role,
      } = req.body;

      try {
        const newUser = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password: await hashPassword(password), // Asegúrate de encriptar la contraseña
            phone,
            address,
            city,
            postalCode,
            country,
            role: role || "user",
          },
        });
        res.status(201).json(newUser);
      } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: "Error al crear el usuario" });
      }
      break;

    case "DELETE":
      const { id } = req.query;

      try {
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
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
