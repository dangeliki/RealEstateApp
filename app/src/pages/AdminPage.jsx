import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AdminPage() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/admin/users", {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.role === "admin") {
      fetchUsers();
    }
  }, [currentUser]);

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/users/${id}`, { withCredentials: true });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert("Error deleting user: " + (err.response?.data?.message || err.message));
    }
  };

  // Start editing user
  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditFormData({ username: user.username, email: user.email, role: user.role });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditUserId(null);
    setEditFormData({});
  };

  // Handle input change
  const handleChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Save edit
  const handleSave = async (id) => {
    try {
      const res = await axios.put(
        `/api/admin/users/${id}`,
        editFormData,
        { withCredentials: true }
      );
      setUsers(users.map((u) => (u._id === id ? res.data : u)));
      setEditUserId(null);
    } catch (err) {
      alert("Error updating user: " + (err.response?.data?.message || err.message));
    }
  };

  if (currentUser?.role !== "admin") {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <p className="text-center text-red-600 text-lg font-semibold">
          Access denied: Admins only.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">Admin Panel</h1>

      {loading && <p className="text-center">Loading users...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300">Username</th>
                <th className="p-2 border border-gray-300">Email</th>
                <th className="p-2 border border-gray-300">Role</th>
                <th className="p-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="text-center hover:bg-gray-50">
                  {editUserId === u._id ? (
                    <>
                      {/* Editable row */}
                      <td className="p-2 border border-gray-300">
                        <input
                          type="text"
                          name="username"
                          value={editFormData.username}
                          onChange={handleChange}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="p-2 border border-gray-300">
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleChange}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="p-2 border border-gray-300">
                        <select
                          name="role"
                          value={editFormData.role}
                          onChange={handleChange}
                          className="border p-1 rounded"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-2 border border-gray-300 flex gap-2 justify-center">
                        <button
                          onClick={() => handleSave(u._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      {/* Normal row */}
                      <td className="p-2 border border-gray-300">{u.username}</td>
                      <td className="p-2 border border-gray-300">{u.email}</td>
                      <td className="p-2 border border-gray-300">
                        <span
                          className={`px-2 py-1 rounded text-white ${
                            u.role === "admin" ? "bg-red-600" : "bg-blue-600"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-2 border border-gray-300 flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(u)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
