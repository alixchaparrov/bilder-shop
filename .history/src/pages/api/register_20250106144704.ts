import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }

  // Imprime el cuerpo de la solicitud para verificar los datos recibidos
  console.log("Datos recibidos:", req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    // Verifica si ya existe un usuario con el mismo email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "El email ya está en uso." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user", // Asegúrate de que el campo "role" exista en tu modelo
      },
    });

    console.log("Usuario creado:", user);

    return res.status(201).json({ message: "Usuario registrado exitosamente.", user });
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    if (error.code === "P2002") {
      // Manejo de error espec
