import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">Platform overview, {user?.displayName}</p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Total Workers</p>
          <p className="text-2xl font-extrabold text-gray-900">--</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Total Buyers</p>
          <p className="text-2xl font-extrabold text-gray-900">--</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Total Coins</p>
          <p className="text-2xl font-extrabold text-primary">--</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Total Payments</p>
          <p className="text-2xl font-extrabold text-emerald-600">--</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;