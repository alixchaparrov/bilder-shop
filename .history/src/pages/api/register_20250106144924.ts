import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }

  // Imprime el cuerpo de la solicitud para depurar
  console.log("Datos recibidos en el cuerpo:", req.body);

  const { name, email, password } = req.body;

  // Validación de datos
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    // Verifica si ya existe un usuario con el mismo email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "El email ya está registrado." });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user", // Asegúrate de que el campo role esté definido en tu modelo
      },
    });

    console.log("Usuario creado exitosamente:", user);

    return res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Error al registrar usuario:", error);

    // Manejo de errores de Prisma (por ejemplo, email duplicado)
    if (error.code === "P2002") {
      return res.status(400).json({ error: "El email ya está registrado." });
    }

    return res.status(500).json({ error: "Error interno del servidor." });
  }
}

