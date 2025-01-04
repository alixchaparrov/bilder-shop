const AuthModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
  <div
    className="modal-content bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="modal-header flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <span className="text-green-600">
          <FaLock size={24} />
        </span>
        <h2 className="text-lg font-semibold text-gray-800">Willkommen!</h2>
      </div>
      <button
        className="text-gray-400 hover:text-red-500"
        onClick={onClose}
        aria-label="Schließen"
      >
        <FaTimes size={20} />
      </button>
    </div>
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email-Adresse
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          placeholder="Email"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Passwort
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          placeholder="Passwort"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
      >
        Anmelden
      </button>
    </form>
    <div className="mt-4 text-center text-sm">
      <p>
        Haben Sie noch kein Konto?{' '}
        <a
          href="#register"
          className="text-blue-500 hover:underline font-medium"
        >
          Registrieren
        </a>
      </p>
    </div>
  </div>
</div>

  );
};

export default AuthModal;
