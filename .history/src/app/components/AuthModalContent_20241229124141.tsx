// Login con Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Checar si existe en Firestore, si no, agregarlo como "normal"
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: user.email,
        role: "normal", // Default role
        name: user.displayName || "",
      });
    }

    return user;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    throw new Error("Inicio de sesión fallido.");
  }
};

// Obtener rol de usuario
export const getUserRole = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data()?.role : null;
  } catch (error) {
    console.error("Error al obtener rol de usuario:", error);
    throw new Error("Error al obtener rol.");
  }
};