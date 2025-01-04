// sanity/schemaTypes/user.ts
const user = {
    name: "user",
    title: "User",
    type: "document",
    fields: [
      {
        name: "email",
        title: "Correo Electrónico",
        type: "string",
      },
      {
        name: "password",
        title: "Contraseña",
        type: "string",
        hidden: true, 
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
  