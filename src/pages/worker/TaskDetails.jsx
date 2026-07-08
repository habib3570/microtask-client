import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submissionDetail, setSubmissionDetail] = useState("");
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/tasks/${id}`);
      setTask(res.data);
    } catch {
      toast.error("Task not found.");
      navigate("/dashboard/worker/tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submissionDetail.trim().length < 10) {
      toast.error("Submission detail must be at least 10 characters.");
      return;
    }

    setSubmitting(true);
    try {
    await api.post("/submissions", {
        taskId: task.id,
        submissionDetail,
      });
      toast.success("Submission sent successfully! Waiting for buyer&apos;s review.");
      navigate("/dashboard/worker/submissions");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="max-w-4xl">
      <Link
        to="/dashboard/worker/tasks"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 mb-6 transition-colors duration-200 hover:text-primary"
      >
        ← Back to tasks
      </Link>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full">
                {task.requiredWorkers} slots left
              </span>
              <span className="text-xs text-gray-400">
                Deadline: {new Date(task.completionDate).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-3">{task.taskTitle}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{task.taskDetail}</p>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-700 mb-1">📌 Submission Requirement</p>
              <p className="text-sm text-amber-700">{task.submissionInfo}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Submit Your Work</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                rows={5}
                value={submissionDetail}
                onChange={(e) => setSubmissionDetail(e.target.value)}
                placeholder="Describe what you did and paste any proof link (screenshot URL, etc.)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
              />
              <button
                type="submit"
                disabled={submitting || task.requiredWorkers <= 0}
                className="mt-4 w-full py-3.5 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {task.requiredWorkers <= 0
                  ? "No Slots Available"
                  : submitting
                  ? "Submitting..."
                  : "Submit Task"}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">You Will earn</p>
            <p className="text-3xl font-extrabold text-primary mb-1">{task.payableAmount}</p>
            <p className="text-xs text-gray-400">coins per submission</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">Posted by</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                {task.buyerName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{task.buyerName}</p>
                <p className="text-xs text-gray-400">{task.buyerEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;