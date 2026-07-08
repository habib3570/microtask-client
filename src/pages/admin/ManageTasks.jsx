import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks/all");
      setTasks(res.data);
    } catch {
      toast.error("Failed to load payment requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task? Remaining coins will be refunded to the buyer.")) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted, coins refunded to buyer.");
      setTasks(tasks.filter((t) => t.id !== id));
} catch {
      toast.error("Failed to load Manage Tasks requests.");
    }
  };

  const filteredTasks = tasks.filter(
    (t) =>
      t.taskTitle.toLowerCase().includes(search.toLowerCase()) ||
      t.buyerEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Tasks</h1>
          <p className="text-gray-500">{tasks.length} total tasks on the platform</p>
        </div>
        <input
          type="text"
          placeholder="Search by title or buyer email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none w-72 transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
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
                <th className="text-left px-5 py-3 font-semibold">Task</th>
                <th className="text-left px-5 py-3 font-semibold">Buyer</th>
                <th className="text-left px-5 py-3 font-semibold">Slots Left</th>
                <th className="text-left px-5 py-3 font-semibold">Payable</th>
                <th className="text-left px-5 py-3 font-semibold">Deadline</th>
                <th className="text-right px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((t) => (
                <tr key={t.id} className="border-t border-gray-100 transition-colors duration-200 hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900 max-w-xs truncate">{t.taskTitle}</td>
                  <td className="px-5 py-4 text-gray-500">{t.buyerEmail}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        t.requiredWorkers > 0 ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {t.requiredWorkers}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-primary">{t.payableAmount} coins</td>
                  <td className="px-5 py-4 text-gray-500">{new Date(t.completionDate).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-200 rounded-lg transition-all duration-200 hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
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

export default ManageTasks;