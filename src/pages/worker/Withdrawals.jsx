import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const statusStyle = {
  Pending: "bg-amber-100 text-amber-600",
  Approved: "bg-emerald-100 text-emerald-600",
  Rejected: "bg-red-100 text-red-600",
};

const Withdrawals = () => {
  const { user } = useAuth();
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ withdrawalCoin: "", paymentSystem: "Bkash", accountNumber: "" });
  const [submitting, setSubmitting] = useState(false);

 useEffect(() => {
    fetchWithdrawals();
  }, []);
  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/withdrawals/worker/${user.email}`);
      setWithdrawals(res.data);
    } catch {
      toast.error("Failed to load withdrawals.");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/withdrawals", {
        ...form,
        withdrawalCoin: Number(form.withdrawalCoin),
      });
      toast.success("Withdrawal request submitted!");
      setForm({ withdrawalCoin: "", paymentSystem: "Bkash", accountNumber: "" });
      setShowForm(false);
      fetchWithdrawals();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Withdrawal request failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Withdrawals</h1>
          <p className="text-gray-500">
            Current balance: <span className="font-semibold text-primary">{user?.coin} coins</span> · Min withdrawal 200 coins (20 coins = ৳1)
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5"
        >
          {showForm ? "Cancel" : "+ New Withdrawal"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 grid sm:grid-cols-3 gap-4 items-end"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Coin amount</label>
            <input
              type="number"
              required
              min={200}
              value={form.withdrawalCoin}
              onChange={(e) => setForm({ ...form, withdrawalCoin: e.target.value })}
              placeholder="Min 200"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Payment method</label>
            <select
              value={form.paymentSystem}
              onChange={(e) => setForm({ ...form, paymentSystem: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              <option value="Bkash">bKash</option>
              <option value="Nagad">Nagad</option>
              <option value="Rocket">Rocket</option>
              <option value="Bank">Bank</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Account number</label>
            <input
              type="text"
              required
              value={form.accountNumber}
              onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
              placeholder="01XXXXXXXXX"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="sm:col-span-3 py-3 bg-primary text-white font-semibold rounded-xl transition-all duration-300 hover:bg-primary-dark disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Request Withdrawal"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : withdrawals.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">💸</p>
          <p className="text-gray-500">No withdrawal requests yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Coins</th>
                <th className="text-left px-5 py-3 font-semibold">Amount</th>
                <th className="text-left px-5 py-3 font-semibold">Method</th>
                <th className="text-left px-5 py-3 font-semibold">Account</th>
                <th className="text-left px-5 py-3 font-semibold">Date</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w.id} className="border-t border-gray-100 transition-colors duration-200 hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900">{w.withdrawalCoin}</td>
                  <td className="px-5 py-4 font-semibold text-primary">৳{w.withdrawalAmount}</td>
                  <td className="px-5 py-4 text-gray-500">{w.paymentSystem}</td>
                  <td className="px-5 py-4 text-gray-500">{w.accountNumber}</td>
                  <td className="px-5 py-4 text-gray-500">{new Date(w.withdrawDate).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusStyle[w.status]}`}>
                      {w.status}
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

export default Withdrawals;