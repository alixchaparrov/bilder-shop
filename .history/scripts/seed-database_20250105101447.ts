import prisma from '../src/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('securepassword', 10);

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
