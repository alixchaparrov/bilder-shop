import type { Config } from "tailwindcss";

import forms from "@tailwindcss/forms";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00704A", // Verde oscuro para un estilo tropical
        secondary: "#FFB400", // Amarillo vibrante para resaltar
        accent: "#D62828", // Rojo cálido para botones o acentos
        background: "#F3F4F6", // Fondo neutro claro
        card: "#FFFFFF", // Fondo blanco para tarjetas
        textDark: "#1B1B1B", // Texto oscuro
        textLight: "#FAFAFA", // Texto claro
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Elegante y moderna
        serif: ["Merriweather", "serif"], // Clásica para títulos
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra suave para tarjetas
      },
    },
  },
  darkMode: "class", // Activa el soporte para modo oscuro
  plugins: [require("@tailwindcss/forms")], // Usa el plugin importado
} satisfies Config;
