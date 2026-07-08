const stats = [
  { label: "Active Workers", value: "4,210", icon: "👷" },
  { label: "Live Tasks", value: "980", icon: "📋" },
  { label: "Paid to Workers", value: "৳5.4L", icon: "💰" },
  { label: "Verified Buyers", value: "312", icon: "🏢" },
];

const StatsSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 cursor-default"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;