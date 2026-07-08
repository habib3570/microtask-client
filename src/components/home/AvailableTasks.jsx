import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AvailableTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/tasks/preview`)
      .then((res) => setTasks(res.data))
      .catch(() => setTasks([]));
  }, []);

  const dummy = [
    { id: 1, taskTitle: "Watch YouTube video & Subscribe", payableAmount: 5, requiredWorkers: 12 },
    { id: 2, taskTitle: "Follow our Facebook Page", payableAmount: 3, requiredWorkers: 28 },
    { id: 3, taskTitle: "App Store Review & Rating", payableAmount: 8, requiredWorkers: 6 },
  ];

  const displayTasks = tasks.length ? tasks : dummy;

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-14">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Available Tasks</h2>
            <p className="text-gray-500">Fresh opportunities updated every hour</p>
          </div>
          <Link
            to="/login"
            className="hidden sm:inline-block px-5 py-2.5 border-2 border-primary text-primary font-semibold rounded-lg transition-all duration-300 hover:bg-primary hover:text-white"
          >
            View All Tasks
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayTasks.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/30 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full">Open</span>
                <span className="text-xs text-gray-400">{t.requiredWorkers} slots left</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                {t.taskTitle}
              </h3>
              <p className="text-sm text-gray-500 mb-5">Complete the task and submit proof for review.</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold text-primary">{t.payableAmount} Coins</span>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-gray-700 transition-colors duration-300 hover:text-primary"
                >
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableTasks;