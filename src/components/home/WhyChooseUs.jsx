const features = [
  { icon: "🔒", title: "Secure & Trusted", desc: "Every submission is manually reviewed before payment." },
  { icon: "⚡", title: "Fast Withdrawals", desc: "Get your money via bKash, Nagad, or Rocket within hours." },
  { icon: "🎯", title: "Fair Task Matching", desc: "Tasks suited to your skill level, updated constantly." },
  { icon: "💬", title: "24/7 Support", desc: "Our team is always ready to help resolve any issue." },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Why Choose MicroTask</h2>
          <p className="text-gray-500">Built for both workers and buyers, with trust at the core</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;