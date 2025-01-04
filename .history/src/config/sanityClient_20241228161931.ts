import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'mo3mvugi', // Asegúrate de que este sea tu Project ID
  dataset: 'production', // Dataset que estás usando
  apiVersion: '2023-01-01', // Fecha de la API
  useCdn: true, // Activa la CDN para optimizar las solicitudes
});
