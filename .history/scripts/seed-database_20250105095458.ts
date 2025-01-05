const prisma = require('../src/lib/prisma');

async function main() {
  await prisma.user.createMany({
    data: [
      { email: 'admin@example.com', password: 'securepassword', role: 'admin' },
      { email: 'user@example.com', password: 'securepassword', role: 'user' },
    ],
  });

  console.log('Base de datos inicializada con datos predeterminados');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect();
  });
