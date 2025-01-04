export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string', // Guardar un hash, nunca texto plano
      },
      {
        name: 'role',
        title: 'Role',
        type: 'string', // 'admin' o 'user'
        options: {
          list: [
            { title: 'Admin', value: 'admin' },
            { title: 'User', value: 'user' },
          ],
        },
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
    ],
  };
  