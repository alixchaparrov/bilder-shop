import prisma from '../src/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  // Cifrar la contraseña
  const hashedPassword = await bcrypt.hash('securepassword', 10);

  // Crear un nuevo usuario con la contraseña cifrada
  await prisma.user.create({
    data: {
      email: 'newuser@example.com',
      password: hashedPassword,
      role: 'user',
    },
  });

  console.log('Usuario creado con contraseña cifrada');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
