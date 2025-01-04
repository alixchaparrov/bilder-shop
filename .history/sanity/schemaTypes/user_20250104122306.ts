// sanity/schemaTypes/user.ts
const user = {
    name: "user",
    title: "Usuario",
    type: "document",
    fields: [
      {
        name: "email",
        title: "Correo Electrónico",
        type: "string",
        validation: (Rule) => Rule.required().email(),
      },
      {
        name: "password",
        title: "Contraseña",
        type: "string",
        hidden: true, 
        Password must be at least 8 characters long
      },
      {
        name: "role",
        title: "Rol",
        type: "string",
        options: {
          list: [
            { title: "Admin", value: "admin" },
            { title: "Usuario", value: "user" },
          ],
        },
        validation: (Rule) => Rule.required(),
      },
    ],
  };
  
  export default user;
  