<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h1 className="text-2xl font-bold mb-4">Restablecer Contraseña</h1>
    {message && (
      <p className="mb-4 text-center text-sm text-red-500">{message}</p>
    )}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Nueva contraseña
        </label>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Confirmar contraseña
        </label>
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Actualizar Contraseña
      </button>
    </form>
  </div>
</div>
