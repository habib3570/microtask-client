import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const AddTask = () => {
  const [form, setForm] = useState({
    taskTitle: "",
    taskDetail: "",
    requiredWorkers: "",
    payableAmount: "",
    completionDate: "",
    submissionInfo: "",
    taskImageUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const totalCost =
    (Number(form.requiredWorkers) || 0) * (Number(form.payableAmount) || 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/tasks", {
        ...form,
        requiredWorkers: Number(form.requiredWorkers),
        payableAmount: Number(form.payableAmount),
        completionDate: new Date(form.completionDate).toISOString(),
      });
      toast.success("Task created successfully!");
      navigate("/dashboard/buyer/tasks");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Add New Task</h1>
      <p className="text-gray-500 mb-6">Fill in the details below to post a new task</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Task title</label>
          <input
            type="text"
            name="taskTitle"
            required
            value={form.taskTitle}
            onChange={handleChange}
            placeholder="e.g. Watch my YouTube video and subscribe"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Task detail</label>
          <textarea
            name="taskDetail"
            required
            rows={4}
            value={form.taskDetail}
            onChange={handleChange}
            placeholder="Describe exactly what the worker needs to do"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Required workers</label>
            <input
              type="number"
              name="requiredWorkers"
              required
              min={1}
              value={form.requiredWorkers}
              onChange={handleChange}
              placeholder="e.g. 10"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Payable amount (coins/worker)</label>
            <input
              type="number"
              name="payableAmount"
              required
              min={1}
              value={form.payableAmount}
              onChange={handleChange}
              placeholder="e.g. 5"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Completion date</label>
          <input
            type="date"
            name="completionDate"
            required
            value={form.completionDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Submission requirement</label>
          <input
            type="text"
            name="submissionInfo"
            required
            value={form.submissionInfo}
            onChange={handleChange}
            placeholder="e.g. Screenshot of subscription + comment"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Task image URL (optional)</label>
          <input
            type="text"
            name="taskImageUrl"
            value={form.taskImageUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
          />
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Total cost (deducted from your balance)</span>
          <span className="text-xl font-extrabold text-primary">{totalCost} coins</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;