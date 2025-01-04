const user = {
    name: "user",
    title: "User",
    type: "document",
    fields: [
      {
        name: "email",
        title: "E-mai",
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
      },
    ],
  };
  
  export default user;
  