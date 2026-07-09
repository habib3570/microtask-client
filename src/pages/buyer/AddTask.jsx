import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { uploadImageToImgBB } from "../../services/imageUpload";
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
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const totalCost =
    (Number(form.requiredWorkers) || 0) * (Number(form.payableAmount) || 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploadingImage(true);

    try {
      const url = await uploadImageToImgBB(file);
      setForm((prev) => ({ ...prev, taskImageUrl: url }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed. Try again.");
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setForm((prev) => ({ ...prev, taskImageUrl: "" }));
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
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Task image (optional)</label>

          {imagePreview ? (
            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 group">
              <img src={imagePreview} alt="Task preview" className="w-full h-full object-cover" />
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500 hover:text-white"
              >
                ✕
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary/5">
              <span className="text-3xl mb-2">📷</span>
              <span className="text-sm font-medium text-gray-600">Click to browse and upload an image</span>
              <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Total cost (deducted from your balance)</span>
          <span className="text-xl font-extrabold text-primary">{totalCost} coins</span>
        </div>

        <button
          type="submit"
          disabled={submitting || uploadingImage}
          className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60"
        >
          {submitting ? "Creating..." : uploadingImage ? "Uploading image..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;