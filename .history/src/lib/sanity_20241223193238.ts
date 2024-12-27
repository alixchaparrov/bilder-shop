import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configuración del cliente Sanity
const client = createClient({
  projectId: 'tu-project-id', // Reemplaza con tu ID de proyecto
  dataset: 'production', // Nombre del dataset (usualmente 'production')
  apiVersion: '2023-01-01', // Fecha de la API
  useCdn: true, // Activa CDN para mejorar el rendimiento en producción
});

// Configuración del generador de URLs de imágenes
const builder = imageUrlBuilder(client);

// Función para generar URLs de imágenes
export const urlFor = (source: any) => {
  if (!source || !source.asset) return ''; // Verifica que la fuente sea válida
  return builder.image(source);
};

// Exporta el cliente Sanity
export default client;
