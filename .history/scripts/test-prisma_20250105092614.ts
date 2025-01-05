import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear un nuevo usuario
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'securepassword',
      role: 'admin',
    },
  });

  console.log('Nuevo usuario creado:', user);

  // Consultar todos los usuarios
  const users = await prisma.user.findMany();
  console.log('Todos los usuarios:', users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
