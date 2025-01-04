import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";

export const registerUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error while registering user:", error);
    throw new Error("Registration failed. Please try again.");
  }
};

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error while logging in:", error);
    throw new Error("Login failed. Please check your credentials.");
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User successfully logged out.");
  } catch (error) {
    console.error("Error while logging out:", error);
    throw new Error("Logout failed. Please try again.");
  }
};

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