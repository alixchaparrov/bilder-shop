import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generar un token único
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hora

    // Guardar el token y la fecha de expiración en la base de datos
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpires,
      },
    });

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // O el servicio de correo que uses
      auth: {
        user: "alix.chava.95@gmail.com", 
        pass: "Abc123", 
      },
    });

    // Enviar correo con el token de restablecimiento
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`; // Ajusta el URL a tu frontend
    await transporter.sendMail({
      from: '"Admin" <tu-email@gmail.com>',
      to: email,
      subject: "Restablecimiento de contraseña",
      html: `
        <p>Hola,</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace para restablecerla:</p>
        <a href="${resetUrl}">Restablecer contraseña</a>
        <p>Si no solicitaste este cambio, simplemente ignora este correo.</p>
      `,
    });

    return res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.error("Error al enviar el correo de restablecimiento:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
