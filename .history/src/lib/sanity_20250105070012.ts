import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

console.log("ENV VARIABLES:", {
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.SANITY_DATASET,
  NEXT_PUBLIC_SANITY_WRITE_TOKEN: process.env.SANITY_WRITE_TOKEN,
});


const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mo3mvugi", 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
