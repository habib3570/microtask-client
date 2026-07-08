import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalSubmissions: 0, pendingSubmissions: 0, totalEarning: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/stats/worker/${user.email}`);
      setStats(res.data);
    }  catch {
      toast.error("Failed to load Status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Worker Dashboard</h1>
      <p className="text-gray-500 mb-6">Here is your earning summary, {user?.displayName}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Total Submissions</p>
          <p className="text-2xl font-extrabold text-gray-900">{loading ? "--" : stats.totalSubmissions}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Pending Submissions</p>
          <p className="text-2xl font-extrabold text-amber-500">{loading ? "--" : stats.pendingSubmissions}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Total Earning</p>
          <p className="text-2xl font-extrabold text-emerald-600">{loading ? "--" : `${stats.totalEarning} coins`}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="font-semibold text-gray-900 mb-1">Ready to earn more?</p>
          <p className="text-sm text-gray-500">Browse available tasks and start submitting your work today.</p>
        </div>
        <Link
          to="/dashboard/worker/tasks"
          className="px-6 py-3 bg-primary text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5"
        >
          Browse Tasks
        </Link>
      </div>
    </div>
  );
};

export default WorkerDashboard;