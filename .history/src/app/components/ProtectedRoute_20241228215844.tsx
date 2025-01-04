import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const { isAdmin } = userDoc.data();
          setIsAllowed(adminOnly ? isAdmin : true);
        }
      } else {
        setIsAllowed(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminOnly]);

  if (loading) return <div>Cargando...</div>;
  if (!isAllowed) return <div>No tienes acceso a esta página.</div>;

  return <>{children}</>;
}
