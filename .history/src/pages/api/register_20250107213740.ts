import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import "react-toastify/dist/ReactToastify.css";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verifica si el método es POST
  if (req.method !== "POST") {
    console.error("Método no permitido:", req.method);
    return res.status(405).json({ error: "Método no permitido." });
  }

  // Imprime el cuerpo de la solicitud para depuración
  console.log("Cuerpo recibido:", req.body);

  const { name, email, password } = req.body;

  // Validación de datos
  if (!name || !email || !password) {
    console.error("Faltan campos requeridos:", { name, email, password });
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    // Verifica si ya existe un usuario con el mismo email
    console.log("Buscando usuario con email:", email);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.warn("El email ya está registrado:", email);
      return res.status(409).json({ error: "El email ya está registrado." });
    }

    // Hashea la contraseña
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el usuario
    console.log("Creando usuario...");
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user", // Asegúrate de que el campo role esté definido en tu modelo
      },
    });

    console.log("Usuario creado exitosamente:", user);

    // Respuesta exitosa
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

    // Manejo de errores de Prisma
    if (error.code === "P2002") {
      console.warn("Conflicto: El email ya está registrado.");
      return res.status(400).json({ error: "El email ya está registrado." });
    }

    // Error general
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}
