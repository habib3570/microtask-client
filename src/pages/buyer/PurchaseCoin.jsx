import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const coinPackages = [
  { coins: 100, price: 100 },
  { coins: 500, price: 450 },
  { coins: 1000, price: 850 },
  { coins: 2000, price: 1600 },
];

const PurchaseCoin = () => {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [form, setForm] = useState({ paymentMethod: "Bkash", senderNumber: "", transactionId: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPkg) {
      toast.error("Please select a coin package first.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/payments", {
        coinPurchased: selectedPkg.coins,
        amount: selectedPkg.price,
        ...form,
      });
      toast.success("Payment submitted! Waiting for admin verification.");
      setSelectedPkg(null);
      setForm({ paymentMethod: "Bkash", senderNumber: "", transactionId: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit payment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Purchase Coin</h1>
      <p className="text-gray-500 mb-6">Select a package, send money, then submit transaction details</p>

      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        {coinPackages.map((pkg) => (
          <button
            key={pkg.coins}
            onClick={() => setSelectedPkg(pkg)}
            className={`p-5 rounded-2xl border-2 text-center transition-all duration-200 ${
              selectedPkg?.coins === pkg.coins
                ? "border-primary bg-primary/5 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:-translate-y-1"
            }`}
          >
            <p className="text-2xl font-extrabold text-gray-900">{pkg.coins}</p>
            <p className="text-xs text-gray-400 mb-2">coins</p>
            <p className="text-sm font-semibold text-primary">৳{pkg.price}</p>
          </button>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-6">
        <p className="text-sm font-semibold text-amber-700 mb-2">📌 Payment Instructions</p>
        <p className="text-sm text-amber-700 leading-relaxed">
          Send the exact amount to <span className="font-bold">bKash/Nagad/Rocket: 01712345678</span> (Personal), then
          enter the Transaction ID and your sending number below. Your coins will be added after admin verification (usually within a few hours).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Payment method</label>
          <select
            value={form.paymentMethod}
            onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
          >
            <option value="Bkash">bKash</option>
            <option value="Nagad">Nagad</option>
            <option value="Rocket">Rocket</option>
            <option value="Bank">Bank</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your sender number</label>
          <input
            type="text"
            required
            value={form.senderNumber}
            onChange={(e) => setForm({ ...form, senderNumber: e.target.value })}
            placeholder="01XXXXXXXXX"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Transaction ID</label>
          <input
            type="text"
            required
            value={form.transactionId}
            onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
            placeholder="e.g. 8N7X2K9P1Q"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        {selectedPkg && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              You will receive {selectedPkg.coins} coins for
            </span>
            <span className="text-xl font-extrabold text-primary">৳{selectedPkg.price}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Payment"}
        </button>
      </form>
    </div>
  );
};

export default PurchaseCoin;