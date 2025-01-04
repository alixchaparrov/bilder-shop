import Image from "next/image";

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <div className="text-2xl font-bold">Kolumbianische Gemälde</div>
      </div>

      {/* Resto de la barra */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Produkte suchen..."
          className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-secondary text-black px-4 py-2 rounded-lg hover:bg-secondary-dark"
        >
          {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </button>
      </div>
    </nav>
  );
}
