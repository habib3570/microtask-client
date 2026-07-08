import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const statusStyle = {
  Pending: "bg-amber-100 text-amber-600",
  Success: "bg-emerald-100 text-emerald-600",
  Failed: "bg-red-100 text-red-600",
};

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/payments/buyer/${user.email}`);
      setPayments(res.data);
    }  catch {
      toast.error("Failed to load payment requests.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Payment History</h1>
      <p className="text-gray-500 mb-6">Track all your coin purchase requests</p>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">🧾</p>
          <p className="text-gray-500">No payment history yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Coins</th>
                <th className="text-left px-5 py-3 font-semibold">Amount</th>
                <th className="text-left px-5 py-3 font-semibold">Method</th>
                <th className="text-left px-5 py-3 font-semibold">Transaction ID</th>
                <th className="text-left px-5 py-3 font-semibold">Date</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-t border-gray-100 transition-colors duration-200 hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900">{p.coinPurchased}</td>
                  <td className="px-5 py-4 font-semibold text-primary">৳{p.amount}</td>
                  <td className="px-5 py-4 text-gray-500">{p.paymentMethod}</td>
                  <td className="px-5 py-4 text-gray-500">{p.transactionId}</td>
                  <td className="px-5 py-4 text-gray-500">{new Date(p.paymentDate).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusStyle[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;