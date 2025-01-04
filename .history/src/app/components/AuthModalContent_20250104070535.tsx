const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    if (isRegistering) {
      await register(email, password);
    } else {
      await login(email, password);
    }
    onClose();

    if (user) {
      console.log("Usuario autenticado:", user); // Log para depurar
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    }
  } catch (err: any) {
    setError(err.message);
  }
};
