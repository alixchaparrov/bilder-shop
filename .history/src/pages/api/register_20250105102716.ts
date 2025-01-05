import prisma from '@/lib/prisma'; // Ajusta esta ruta según la ubicación de tu archivo prisma.ts
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parsear los datos del body
    const { email, password, role } = await req.json();

    // Validaciones básicas
    if (!email || !password) {
      return NextResponse.json(
        { error: 'El email y la contraseña son obligatorios' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'El email no es válido' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'user', // Valor por defecto 'user' si no se envía el role
      },
    });

    // Respuesta exitosa
    return NextResponse.json({
      message: 'Usuario registrado exitosamente',
      user,
    });
  } catch (error: any) {
    // Manejo de errores específicos de Prisma
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Error general
    return NextResponse.json(
      { error: 'Error inesperado al registrar usuario' },
      { status: 500 }
    );
  }
}
