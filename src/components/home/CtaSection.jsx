import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="bg-primary py-20 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full"></div>
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/10 rounded-full"></div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to Start Earning or Hiring?
        </h2>
        <p className="text-indigo-100 mb-8 text-lg">
          Join MicroTask today and become part of Bangladeshi fastest growing earning community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-3.5 bg-white text-primary font-bold rounded-xl transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-xl"
          >
            Create Free Account
          </Link>
          <Link
            to="/login"
            className="px-8 py-3.5 bg-transparent text-white font-bold rounded-xl border-2 border-white/40 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
          >
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;