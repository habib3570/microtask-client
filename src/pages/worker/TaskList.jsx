import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter((t) =>
    t.taskTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Available Tasks</h1>
          <p className="text-gray-500">Browse and complete tasks to earn coins</p>
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none w-64 transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-500">No tasks available right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 group"
            >
              {task.taskImageUrl ? (
                <img src={task.taskImageUrl} alt={task.taskTitle} className="w-full h-36 object-cover" />
              ) : (
                <div className="w-full h-36 bg-gradient-to-br from-indigo-100 to-emerald-100 flex items-center justify-center text-4xl">
                  📋
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full">
                    {task.requiredWorkers} slots left
                  </span>
                  <span className="text-xs text-gray-400">
                    Due {new Date(task.completionDate).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {task.taskTitle}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.taskDetail}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-lg font-extrabold text-primary">{task.payableAmount}</span>
                    <span className="text-xs text-gray-400 ml-1">coins</span>
                  </div>
                  <Link
                    to={`/dashboard/worker/tasks/${task.id}`}
                    className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/25"
                  >
                    View Details
                  </Link>
                </div>
                <p className="text-xs text-gray-400 mt-3">Posted by {task.buyerName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;