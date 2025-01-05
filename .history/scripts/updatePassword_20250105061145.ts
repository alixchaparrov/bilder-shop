import client from "../src/lib/sanity"; // Ajusta la ruta según tu proyecto
import bcrypt from "bcryptjs";

const updatePassword = async () => {
  try {
    const userId = "USER_DOCUMENT_ID"; // Reemplaza con el ID del usuario
    const newPassword = "NuevaContraseña123"; // Define la nueva contraseña
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
