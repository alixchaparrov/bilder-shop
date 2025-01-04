import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth as firebaseAuth, db } from "@/lib/firebaseConfig"; // Renombrar la importación de `auth`

// Registro de usuario
export const registerUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.error("Error while registering user:", error);
    throw new Error("Registration failed. Please try again.");
  }
};

// Inicio de sesión de usuario
export const loginUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.error("Error while logging in:", error);
    throw new Error("Login failed. Please check your credentials.");
  }
};

// Cerrar sesión
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(firebaseAuth);
    console.log("User successfully logged out.");
  } catch (error) {
    console.error("Error while logging out:", error);
    throw new Error("Logout failed. Please try again.");
  }
};

// Inicio de sesión con Google
export const loginWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(firebaseAuth, provider);
    const user = result.user;

    // Agregar usuario a Firestore si no existe
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: user.email,
        role: "normal", // Rol predeterminado
        name: user.displayName || "",
      });
    }

    console.log("Google login successful for user:", user.email);
  } catch (error) {
    console.error("Error while logging in with Google:", error);
    throw new Error("Google login failed.");
  }
};
