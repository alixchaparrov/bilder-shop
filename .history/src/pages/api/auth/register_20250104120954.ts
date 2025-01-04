import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, name, role } = req.body;

    // Validaciones básicas
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear objeto del usuario
      const user = {
        _type: "user",
        email,
        password: hashedPassword,
        name,
        role: role || "user", // Por defecto, el rol es "user"
      };

      // Enviar la mutación a Sanity
      const sanityResponse = await axios.post(
        `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.SANITY_DATASET}`,
        {
          mutations: [{ create: user }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
          },
        }
      );

      // Respuesta exitosa
      return res.status(201).json({
        message: "Usuario creado correctamente",
        data: sanityResponse.data,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        error: "Ocurrió un error al crear el usuario",
        details: error.message,
      });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}
