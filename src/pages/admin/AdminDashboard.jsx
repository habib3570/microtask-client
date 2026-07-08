import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalWorkers: 0, totalBuyers: 0, totalCoins: 0, totalPayments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get("/stats/admin");
      setStats(res.data);
    } catch {
      toast.error("Failed to load Admin Dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { label: "Total Workers", value: stats.totalWorkers, color: "text-blue-600" },
    { label: "Total Buyers", value: stats.totalBuyers, color: "text-purple-600" },
    { label: "Total Coins", value: stats.totalCoins, color: "text-primary" },
    { label: "Total Payments", value: `৳${stats.totalPayments}`, color: "text-emerald-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">Platform overview, {user?.displayName}</p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <p className="text-sm text-gray-500 mb-1">{c.label}</p>
            <p className={`text-2xl font-extrabold ${c.color}`}>{loading ? "--" : c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;