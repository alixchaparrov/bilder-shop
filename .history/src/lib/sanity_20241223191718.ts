import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configuración del cliente Sanity
const client = createClient({
  projectId: 'tu-project-id', // Reemplaza con tu Project ID de Sanity
  dataset: 'production', // Nombre del dataset (usualmente 'production')
  apiVersion: '2023-01-01', // Fecha de la API
  useCdn: true, // Activa CDN para mejorar el rendimiento en producción
});

// Configuración del generador de URLs de imágenes
const builder = imageUrlBuilder(client);

// Función para generar URLs de imágenes
export const urlFor = (source: any) => builder.image(source);

// Función para obtener productos desde Sanity
export async function getProducts() {
  return await client.fetch(`*[_type == "product"] | order(_createdAt asc)`);
}

export default client;
