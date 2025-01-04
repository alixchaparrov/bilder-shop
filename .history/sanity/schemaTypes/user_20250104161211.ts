export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    { name: "email", title: "E-Mail", type: "string" },
    { name: "password", title: "Password", type: "string", hidden: true },
    { name: "role", title: "Role", type: "string", options: { list: ["admin", "user"] } },
  ],
};
