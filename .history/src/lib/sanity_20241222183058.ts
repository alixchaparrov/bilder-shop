import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "mo3mvugi", // Reemplaza con tu Project ID de Sanity
  dataset: "production", // Dataset que usaste en Sanity
  apiVersion: "2023-01-01", // Fecha de la API
  useCdn: true, // Para cargas más rápidas en producción
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

export default client;
