import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const roleStyle = {
  Worker: "bg-blue-100 text-blue-600",
  Buyer: "bg-purple-100 text-purple-600",
  Admin: "bg-gray-800 text-white",
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (email, newRole) => {
    try {
      await api.put(`/users/${email}/role`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      setUsers(users.map((u) => (u.email === email ? { ...u, role: newRole } : u)));
    } catch {
      toast.error("Failed to update role.");
    }
  };

  const handleDelete = async (email) => {
    if (!confirm(`Delete user ${email}? This cannot be undone.`)) return;
    try {
      await api.delete(`/users/${email}`);
      toast.success("User deleted.");
      setUsers(users.filter((u) => u.email !== email));
    } catch {
      toast.error("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === "All" || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Users</h1>
          <p className="text-gray-500">{users.length} total users on the platform</p>
        </div>
        <div className="flex gap-3">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
          >
            <option value="All">All Roles</option>
            <option value="Worker">Worker</option>
            <option value="Buyer">Buyer</option>
            <option value="Admin">Admin</option>
          </select>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none w-64 transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">User</th>
                <th className="text-left px-5 py-3 font-semibold">Email</th>
                <th className="text-left px-5 py-3 font-semibold">Coin</th>
                <th className="text-left px-5 py-3 font-semibold">Role</th>
                <th className="text-right px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-t border-gray-100 transition-colors duration-200 hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {u.displayName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900">{u.displayName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{u.email}</td>
                  <td className="px-5 py-4 font-semibold text-primary">{u.coin}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${roleStyle[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.email, e.target.value)}
                        className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg outline-none transition-all duration-200 hover:border-primary focus:border-primary"
                      >
                        <option value="Worker">Worker</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Admin">Admin</option>
                      </select>
                      <button
                        onClick={() => handleDelete(u.email)}
                        className="px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-200 rounded-lg transition-all duration-200 hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;