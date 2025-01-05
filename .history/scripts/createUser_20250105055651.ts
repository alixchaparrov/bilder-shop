import client from "../src/lib/sanity"; // Ajusta la ruta según tu configuración

const createUser = async () => {
  try {
    const newUser = await client.create({
      _type: "user",
      email: "test@example.com",
      password: "hashed_password", // Usa bcrypt para hashear en producción
      role: "user", 
    });

    console.log("Usuario creado exitosamente:", newUser);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
  }
};

createUser();


