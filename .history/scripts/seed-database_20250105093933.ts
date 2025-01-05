import prisma from '../../src/lib/prisma';

async function seed() {
  await prisma.user.createMany({
    data: [
      { email: 'admin@example.com', password: '123456', role: 'admin' },
      { email: 'user@example.com', password: '123456', role: 'user' },
    ],
  });

  console.log('Base de datos inicializada');
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
