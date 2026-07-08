import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MyTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({ taskTitle: "", taskDetail: "", submissionInfo: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/tasks/buyer/${user.email}`);
      setTasks(res.data);
    }  catch {
      toast.error("Failed to load payment requests.");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setEditForm({
      taskTitle: task.taskTitle,
      taskDetail: task.taskDetail,
      submissionInfo: task.submissionInfo,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${editingTask.id}`, editForm);
      toast.success("Task updated successfully!");
      setEditingTask(null);
      fetchTasks();
    } catch {
      toast.error("Failed to load payment requests.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task? Remaining coins will be refunded.")) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted, coins refunded.");
      fetchTasks();
    } catch {
      toast.error("Failed to load My Tasks Requests.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Tasks</h1>
          <p className="text-gray-500">Manage tasks you have created</p>
        </div>
        <Link
          to="/dashboard/buyer/add-task"
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5"
        >
          + Add New Task
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-gray-500">You have not created any tasks yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Title</th>
                <th className="text-left px-5 py-3 font-semibold">Slots Left</th>
                <th className="text-left px-5 py-3 font-semibold">Payable</th>
                <th className="text-left px-5 py-3 font-semibold">Deadline</th>
                <th className="text-right px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className="border-t border-gray-100 transition-colors duration-200 hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900 max-w-xs truncate">{t.taskTitle}</td>
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
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(t)}
                        className="px-3 py-1.5 text-xs font-semibold text-primary border border-primary/30 rounded-lg transition-all duration-200 hover:bg-primary hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
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

      {editingTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Edit Task</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label>
                <input
                  type="text"
                  required
                  value={editForm.taskTitle}
                  onChange={(e) => setEditForm({ ...editForm, taskTitle: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Detail</label>
                <textarea
                  required
                  rows={3}
                  value={editForm.taskDetail}
                  onChange={(e) => setEditForm({ ...editForm, taskDetail: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none resize-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Submission info</label>
                <input
                  type="text"
                  required
                  value={editForm.submissionInfo}
                  onChange={(e) => setEditForm({ ...editForm, submissionInfo: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-600 transition-colors duration-200 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary text-white rounded-xl font-semibold transition-colors duration-200 hover:bg-primary-dark"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;