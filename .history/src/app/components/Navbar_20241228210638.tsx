"use client";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold">Kolumbianische Gemälde</div>
      <div className="flex items-center gap-4">
        <button
          className="bg-secondary px-4 py-2 rounded-lg hover:bg-accent transition"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </button>
      </div>
    </nav>
  );
}
