import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ReviewSubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/submissions/buyer/${user.email}`);
      setSubmissions(res.data);
    } catch {
      toast.error("Failed to load payment requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setProcessingId(id);
    try {
      await api.put(`/submissions/${id}/approve`);
      toast.success("Submission approved, worker paid!");
      setSubmissions(submissions.filter((s) => s.id !== id));
    } catch {
      toast.error("Failed to load payment requests.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    setProcessingId(id);
    try {
      await api.put(`/submissions/${id}/reject`);
      toast.success("Submission rejected.");
      setSubmissions(submissions.filter((s) => s.id !== id));
    } catch {
      toast.error("Failed to Reject submission.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Task To Review</h1>
      <p className="text-gray-500 mb-6">Approve or reject submissions from workers</p>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">✅</p>
          <p className="text-gray-500">No pending submissions to review.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {submissions.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-600 text-xs font-bold rounded-full">
                      Pending
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(s.currentDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{s.taskTitle}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    By <span className="font-medium text-gray-700">{s.workerName}</span> ({s.workerEmail})
                  </p>
                  <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700">{s.submissionDetail}</div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-extrabold text-primary mb-3">{s.payableAmount} coins</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(s.id)}
                      disabled={processingId === s.id}
                      className="px-4 py-2 bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 hover:bg-emerald-600 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(s.id)}
                      disabled={processingId === s.id}
                      className="px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 hover:bg-red-600 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSubmissions;