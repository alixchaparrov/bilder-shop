<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
    <h1 className="text-2xl font-bold mb-4 text-center">Restablecer Contraseña</h1>
    {message && (
      <p
        className={`text-center mb-4 ${
          message.includes("exitosamente")
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {message}
      </p>
    )}
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-medium">
          Nueva contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Actualizar Contraseña
      </button>
    </form>
  </div>
</div>
