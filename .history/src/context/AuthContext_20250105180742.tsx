export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await fetch("/api/auth/nextauth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    const data = await response.json();
    setUser(data.user);
  };

  const logout = () => {
    setUser(null); // Limpia el estado del usuario
  };

  return (
    <AuthContext.Provider value={{ user, login, register: async () => {}, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
