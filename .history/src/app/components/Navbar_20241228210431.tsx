"use client";

export default function Navbar({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (mode: boolean) => void }) {
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold">Kolumbianische Gemälde</div>
      <button
        className="bg-secondary px-4 py-2 rounded-lg hover:bg-accent transition"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
      </button>
    </nav>
  );
}
