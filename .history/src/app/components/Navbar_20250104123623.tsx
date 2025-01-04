
const Navbar = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav>
      {/* Código del Navbar */}
      <div>
        {user ? (
          <>
            <span>Bienvenido, {user.email}</span>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <button onClick={() => setIsModalOpen(true)}>Iniciar sesión / Registrarse</button>
        )}
      </div>

      {isModalOpen && (
        <div>
          <AuthModalContent onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </nav>
  );
};
