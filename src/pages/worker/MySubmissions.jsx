import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const statusStyle = {
  Pending: "bg-amber-100 text-amber-600",
  Approved: "bg-emerald-100 text-emerald-600",
  Rejected: "bg-red-100 text-red-600",
};

const MySubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 6;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchSubmissions();
  }, [page]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/submissions/worker/${user.email}?page=${page}&size=${size}`);
      setSubmissions(res.data.items);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">My Submissions</h1>
      <p className="text-gray-500 mb-6">Track the status of your submitted work</p>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-500">You have not submitted any tasks yet.</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Task</th>
                  <th className="text-left px-5 py-3 font-semibold">Buyer</th>
                  <th className="text-left px-5 py-3 font-semibold">Amount</th>
                  <th className="text-left px-5 py-3 font-semibold">Date</th>
                  <th className="text-left px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} className="border-t border-gray-100 transition-colors duration-200 hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-900">{s.taskTitle}</td>
                    <td className="px-5 py-4 text-gray-500">{s.buyerName}</td>
                    <td className="px-5 py-4 font-semibold text-primary">{s.payableAmount} coins</td>
                    <td className="px-5 py-4 text-gray-500">{new Date(s.currentDate).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusStyle[s.status]}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    page === p
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MySubmissions;