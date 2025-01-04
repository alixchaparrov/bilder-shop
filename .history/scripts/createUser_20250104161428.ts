import client from "../..."; 

const createUser = async () => {
  try {
    const newUser = {
      _type: "user",
      email: "admin@example.com",
      password: "hashed_password", // Usa una función de hash para el password
      role: "admin",
    };

    await client.create(newUser);
    console.log("Usuario creado exitosamente.");
  } catch (error) {
    console.error("Error al crear el usuario:", error);
  }
};

createUser();

