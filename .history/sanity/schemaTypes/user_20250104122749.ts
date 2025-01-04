const user = {
    name: "user",
    title: "User",
    type: "document",
    fields: [
      {
        name: "email",
        title: "E-mail",
        type: "string",
      },
      {
        name: "password",
        title: "",
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
  