import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Configuración del cliente Sanity
const client = createClient({
  projectId: "mo3mvugi", // Reemplaza con tu Project ID
  dataset: "production", // Nombre del dataset
  apiVersion: "2023-01-01", // Versión de la API
  useCdn: true, // Activa el uso de CDN para rendimiento
});

// Configuración del generador de URLs para imágenes
const builder = imageUrlBuilder(client);

// Función para generar URLs de imágenes
export const urlFor = (source: any) => {
  if (!source || !source.asset) return ""; // Valida la fuente
  return builder.image(source).width(400).height(300).quality(80);
};

export default client;
