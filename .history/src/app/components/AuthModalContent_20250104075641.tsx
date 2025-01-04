const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    if (isRegistering) {
      await register(email, password);
    } else {
      await login(email, password);
    }
    onClose();

    // Espera hasta que el usuario esté configurado
    setTimeout(() => {
      if (user?.role === "admin") {
        console.log("Redirigiendo al dashboard de admin...");
        router.push("/admin/dashboard");
      } else {
        console.log("Redirigiendo a la página principal...");
        router.push("/");
      }
    }, 500); // Espera 500ms para garantizar que el usuario esté listo
  } catch (err: any) {
    setError(err.message);
  }
};
