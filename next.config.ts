import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"], // Agrega el dominio de Sanity
  },
};

export default nextConfig;

