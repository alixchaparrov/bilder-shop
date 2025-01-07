<div className="form-container">
  <h1>Restablecer Contraseña</h1>
  <form onSubmit={handleSubmit}>
    <input
      type="password"
      placeholder="Nueva contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <input
      type="password"
      placeholder="Confirmar contraseña"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />
    <button type="submit">Actualizar Contraseña</button>
  </form>
</div>
