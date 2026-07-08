import { useEffect, useState } from "react";
import axios from "axios";

const colors = ["bg-indigo-100 text-indigo-600", "bg-emerald-100 text-emerald-600", "bg-amber-100 text-amber-600", "bg-pink-100 text-pink-600", "bg-sky-100 text-sky-600", "bg-purple-100 text-purple-600"];

const TopWorkers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/users/top-workers`)
      .then((res) => setWorkers(res.data))
      .catch(() => setWorkers([]));
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Top Workers This Month</h2>
          <p className="text-gray-500">Our most active and trusted earners</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
          {(workers.length ? workers : Array.from({ length: 6 })).map((w, i) => (
            <div
              key={w?.id ?? i}
              className="text-center p-5 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 cursor-pointer"
            >
              <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center font-bold text-lg mb-3 ${colors[i % colors.length]}`}>
                {w?.displayName ? w.displayName.charAt(0).toUpperCase() : "?"}
              </div>
              <p className="font-semibold text-gray-900 text-sm truncate">{w?.displayName ?? "Loading..."}</p>
              <p className="text-xs text-primary font-medium mt-1">{w?.coin ?? 0} coins</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopWorkers;