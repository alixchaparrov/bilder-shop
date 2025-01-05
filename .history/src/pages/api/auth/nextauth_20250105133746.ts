import prisma from "@/lib/prisma"; // Asegúrate de importar Prisma correctamente
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido." });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son requeridos." });
    }

    try {
        // Busca al usuario en la base de datos
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        // Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Contraseña incorrecta." });
        }

        // Responde con los datos del usuario
        return res.status(200).json({ 
            message: "Login exitoso",
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
}
