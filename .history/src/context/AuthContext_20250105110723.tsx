const register = async (name: string, email: string, password: string): Promise<void> => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error desconocido");
  }

  const data = await response.json();
  setUser({ name: data.user.name, email: data.user.email, role: data.user.role });
};
