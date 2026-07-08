import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-emerald-50 overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
            🚀 Bangladeshi Trusted Earning Platform
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Earn Coins by Completing <span className="text-primary">Simple Tasks</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Join thousands of workers earning real money daily. Buyers get their tasks completed fast and reliably. Cash out instantly via bKash, Nagad, or Rocket.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register?role=worker"
              className="px-8 py-3.5 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/30 text-center transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1"
            >
              Start Earning Now
            </Link>
            <Link
              to="/register?role=buyer"
              className="px-8 py-3.5 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-200 text-center transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-1"
            >
              Post Your First Task
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-10">
            <div className="flex -space-x-3">
              {["bg-indigo-400", "bg-emerald-400", "bg-amber-400", "bg-pink-400"].map((c, i) => (
                <div key={i} className={`w-10 h-10 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">4,200+</span> workers already earning
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-2xl p-6 transition-transform duration-500 hover:-translate-y-2 hover:shadow-primary/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500">Active Task</span>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full">Open</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Watch YouTube video & Subscribe</h3>
            <p className="text-sm text-gray-500 mb-4">Screenshot proof required after subscribing</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-primary">5 Coins</span>
              <span className="text-xs text-gray-400">12 slots left</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;