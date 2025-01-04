import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "mo3mvugi", // Reemplaza con tu Project ID
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
});


// Initialize URL builder
const builder = imageUrlBuilder(client);

// Helper function to build image URLs
export const urlFor = (source: any) => builder.image(source);

export default client;
