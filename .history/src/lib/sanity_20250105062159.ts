//import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

console.log("ENV VARIABLES:", {
  SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  SANITY_DATASET: process.env.SANITY_DATASET,
  SANITY_WRITE_TOKEN: process.env.SANITY_WRITE_TOKEN,
});


const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "mo3mvugi", 
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
