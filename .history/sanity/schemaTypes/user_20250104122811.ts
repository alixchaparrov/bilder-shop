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
        title: "Password",
        type: "string",
        hidden: true, 
      },
      {
        name: "role",
        title: "Role",
        type: "string",
        options: {
          list: [
            { title: "Admin", value: "admin" },
            { title: "User", value: "user" },
          ],
        },
      },
    ],
  };
  
  export default user;
  