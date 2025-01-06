import prisma from '../src/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const email = 'newuser@example.com'; // Cambia el correo si necesitas probar con otro usuario

  // Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`El usuario con el email ${email} ya existe.`);
    return;
  }

  // Cifrar la contraseña
  const hashedPassword = await bcrypt.hash('securepassword', 10);

  // Crear el nuevo usuario
  await prisma.user.create({
    data: {
      vorname: "Max",
      nachname: "Mustermann",
      email: "max@example.com",
      passwort: await bcrypt.hash("securepassword", 10),
      handy: "123456789",
      addresse: "Musterstraße 1",
      stadt: "Berlin",
      postleitzahl: "10115",
      land: "Deutschland",
      rolle: "admin",
    },
  });
  
  console.log('Usuario creado con contraseña cifrada');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
