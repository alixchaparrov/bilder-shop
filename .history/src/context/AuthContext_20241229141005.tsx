"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const AuthModalContent = ({ onClose }: { onClose: () => void }) => {
  const { loginWithGoogle, user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirigir basado en el rol del usuario
    if (user) {
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/"); // Página principal para usuarios normales
      }
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Anmelden</h2>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Mit Google anmelden
      </button>
    </div>
  );
};

export default AuthModalContent;
