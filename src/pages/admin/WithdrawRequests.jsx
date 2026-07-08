import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const WithdrawRequests = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const res = await api.get("/withdrawals/pending");
      setWithdrawals(res.data);
    } catch {
      toast.error("Failed to load payment requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setProcessingId(id);
    try {
      await api.put(`/withdrawals/${id}/approve`);
      toast.success("Withdrawal approved!");
      setWithdrawals(withdrawals.filter((w) => w.id !== id));
    } catch {
      toast.error("Failed to load payment requests.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a rejection reason.");
      return;
    }
    setProcessingId(id);
    try {
      await api.put(`/withdrawals/${id}/reject`, { rejectionReason: rejectReason });
      toast.success("Withdrawal rejected, coins refunded to worker.");
      setWithdrawals(withdrawals.filter((w) => w.id !== id));
      setRejectingId(null);
      setRejectReason("");
    } catch {
      toast.error("Failed to load WWithdraw requests.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Withdraw Requests</h1>
      <p className="text-gray-500 mb-6">Review and process pending withdrawal requests</p>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : withdrawals.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">💸</p>
          <p className="text-gray-500">No pending withdrawal requests.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {withdrawals.map((w) => (
            <div key={w.id} className="bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {w.workerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{w.workerName}</p>
                      <p className="text-xs text-gray-400">{w.workerEmail}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 mt-3 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">Coins</p>
                      <p className="font-semibold text-gray-900">{w.withdrawalCoin}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Amount</p>
                      <p className="font-semibold text-primary">৳{w.withdrawalAmount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Method</p>
                      <p className="font-semibold text-gray-900">{w.paymentSystem}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Account</p>
                      <p className="font-semibold text-gray-900">{w.accountNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(w.id)}
                    disabled={processingId === w.id}
                    className="px-4 py-2 bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 hover:bg-emerald-600 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setRejectingId(rejectingId === w.id ? null : w.id)}
                    className="px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {rejectingId === w.id && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                  <input
                    type="text"
                    placeholder="Reason for rejection..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg outline-none text-sm transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                  <button
                    onClick={() => handleReject(w.id)}
                    className="px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 hover:bg-red-600"
                  >
                    Confirm Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WithdrawRequests;