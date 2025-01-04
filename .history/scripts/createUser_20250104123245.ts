import client from "@sanity/client";
import bcrypt from "bcryptjs";

const sanityClient = client({
  projectId: "mo3mvugi",
  dataset: "production",
  useCdn: false,
  token: "SANITY_AUTH_TOKEN", // Asegúrate de usar un token con permisos de escritura
});

const createUser = async (email: string, password: string, role: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await sanityClient.create({
    _type: "user",
    email,
    password: hashedPassword,
    role,
  });
  console.log("Usuario creado con éxito");
};

createUser("alix.chava.95@gmail.com", "Abc123", "admin");
