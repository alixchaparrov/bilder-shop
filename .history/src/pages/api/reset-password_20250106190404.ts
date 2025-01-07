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

    // Guardar el token y
