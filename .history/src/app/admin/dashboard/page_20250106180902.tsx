<form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
  <input
    type="text"
    placeholder="Name"
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
    required
    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200 text-gray-900"
  />
  <input
    type="email"
    placeholder="Email"
    value={form.email}
    onChange={(e) => setForm({ ...form, email: e.target.value })}
    required
    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200 text-gray-900"
  />
  <select
    value={form.role}
    onChange={(e) => setForm({ ...form, role: e.target.value })}
    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200 text-gray-900"
  >
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
  <button
    type="submit"
    className="col-span-1 sm:col-span-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
  >
    {form.id ? "Update User" : "Add User"}
  </button>
</form>

{/* Tabla */}
<table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
  <thead>
    <tr className="bg-gray-200 text-gray-900">
      <th className="border p-3 text-left">ID</th>
      <th className="border p-3 text-left">Name</th>
      <th className="border p-3 text-left">Email</th>
      <th className="border p-3 text-left">Role</th>
      <th className="border p-3 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id} className="hover:bg-gray-100 text-gray-900">
        <td className="border p-3">{user.id}</td>
        <td className="border p-3">{user.name}</td>
        <td className="border p-3">{user.email}</td>
        <td className="border p-3 capitalize">{user.role}</td>
        <td className="border p-3 flex space-x-2">
          <button
            onClick={() => handleEdit(user)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
