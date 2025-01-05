import prisma from '../src/lib/prisma';
import bcrypt from 'bcrypt';

async function login(email: string, password: string) {
  // Buscar el usuario por correo
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Comparar la contraseña ingresada con la almacenada
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }

  return user; // Devuelve el usuario si las credenciales son correctas
}

// Ejemplo de uso
login('newuser@example.com', 'securepassword')
  .then((user) => console.log('Inicio de sesión exitoso:', user))
  .catch((err) => console.error(err.message));
