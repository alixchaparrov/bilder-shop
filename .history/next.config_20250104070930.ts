import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"], // Agrega el dominio de Sanity
  },
  // Configuración para evitar problemas de Cross-Origin-Opener-Policy
  async headers() {
    return [
      {
        source: "/(.*)", // Aplica estos encabezados a todas las rutas
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

export default nextConfig;
