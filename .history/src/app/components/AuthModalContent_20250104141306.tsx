const AuthModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Encabezado */}
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Willkommen zurück!
        </h2>

        {/* Formulario */}
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email-Adresse
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Passwort
            </label>
            <input
              type="password"
              id="password"
              placeholder="Passwort"
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Anmelden
          </button>
        </form>

        {/* Registro */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Haben Sie noch keine Konto?{" "}
          <a
            href="#"
            className="text-blue-600 font-semibold hover:underline"
          >
            Registrieren
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
