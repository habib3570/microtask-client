import { useAuth } from "../../context/AuthContext";

const WorkerDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Worker Dashboard</h1>
      <p className="text-gray-500 mb-6">Here is your earning summary, {user?.displayName}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Total Submissions</p>
          <p className="text-2xl font-extrabold text-gray-900">--</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Pending Submissions</p>
          <p className="text-2xl font-extrabold text-amber-500">--</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-gray-500 mb-1">Total Earning</p>
          <p className="text-2xl font-extrabold text-emerald-600">--</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;