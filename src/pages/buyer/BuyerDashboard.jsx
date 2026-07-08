import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ taskCount: 0, pendingTasks: 0, totalPaid: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/stats/buyer/${user.email}`);
      setStats(res.data);
    }  catch {
      toast.error("Failed to load buyer Dashboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Buyer Dashboard</h1>
      <p className="text-gray-500 mb-6">Welcome, {user?.displayName}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Total Tasks</p>
          <p className="text-2xl font-extrabold text-gray-900">{loading ? "--" : stats.taskCount}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Pending Tasks</p>
          <p className="text-2xl font-extrabold text-amber-500">{loading ? "--" : stats.pendingTasks}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Total Paid</p>
          <p className="text-2xl font-extrabold text-emerald-600">{loading ? "--" : `৳${stats.totalPaid}`}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Post a new task</p>
            <p className="text-sm text-gray-500">Get your work done by trusted workers.</p>
          </div>
          <Link
            to="/dashboard/buyer/add-task"
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5"
          >
            Add Task
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Review submissions</p>
            <p className="text-sm text-gray-500">Approve or reject worker submissions.</p>
          </div>
          <Link
            to="/dashboard/buyer/review"
            className="px-5 py-2.5 bg-white border border-primary text-primary text-sm font-semibold rounded-xl transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-0.5"
          >
            Review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;