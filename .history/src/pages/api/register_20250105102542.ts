import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || 'user',
    },
  });

  return NextResponse.json({ message: 'Usuario registrado exitosamente', user });
}
