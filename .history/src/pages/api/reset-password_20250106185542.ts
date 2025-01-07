import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../..//lib/prisma";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

    // Generar un token único (puedes usar cualquier librería como uuid o crypto)
    const resetToken = Math.random().toString(36).substring(2);

    // Guardar el token en la base de datos (puedes usar un campo adicional en el modelo user o una tabla independiente)
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpires: new Date(Date.now() + 3600 * 1000), // 1 hora de validez
      },
    });

    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
      service: "gmail", // O el servicio que uses (Gmail, Outlook, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Tu email
        pass: process.env.EMAIL_PASSWORD, // Tu contraseña
      },
    });

    // Crear el enlace de restablecimiento
    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${resetToken}`;

    // Configurar el correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hi ${user.name},</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}" target="_blank">Reset Password</a>
        <p>If you didn’t request this, you can ignore this email.</p>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
