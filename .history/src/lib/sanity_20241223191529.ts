import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Configuración del cliente de Sanity
const client = createClient({
  projectId: "mo3mvugi", // Reemplaza con tu Project ID de Sanity
  dataset: "production", // Dataset que estás usando en Sanity
  apiVersion: "2023-01-01", // Versión de la API
  useCdn: true, // Usar CDN para cargas más rápidas en producción
});

// Configuración del constructor de URLs para imágenes
const builder = imageUrlBuilder(client);

// Función para construir URLs de imágenes
export const urlFor = (source: any) => builder.image(source);

export default client;