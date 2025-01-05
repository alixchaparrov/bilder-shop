import client from "../src/lib/
import bcrypt from "bcryptjs";

const updatePassword = async () => {
  try {
    const userId = "47da9ab6-92e9-4323-9caa-99b6835e4c6a"; // Reemplaza con el ID del usuario
    const newPassword = "Abc123"; // Define la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await client
      .patch(userId)
      .set({ password: hashedPassword })
      .commit();

    console.log("Contraseña actualizada exitosamente:", updatedUser);
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
  }
};

updatePassword();
