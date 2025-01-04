// src/app/login.tsx
import AuthComponent from "@/app/components/AuthComponent";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-4">Iniciar sesión o Registrarse</h1>
        <AuthComponent />
      </div>
    </div>
  );
};

export default LoginPage;
