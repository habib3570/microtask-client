const steps = [
  {
    step: "01",
    title: "Sign Up",
    desc: "Create your free account as a Worker or Buyer in under a minute.",
    icon: "👤",
  },
  {
    step: "02",
    title: "Complete Tasks",
    desc: "Browse available tasks, submit your work, and wait for approval.",
    icon: "✅",
  },
  {
    step: "03",
    title: "Get Paid",
    desc: "Withdraw your earnings via bKash, Nagad, or Rocket — fast and easy.",
    icon: "💸",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">How It Works</h2>
          <p className="text-gray-500">Three simple steps to start earning or getting things done</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/30 group"
            >
              <span className="absolute top-6 right-6 text-5xl font-extrabold text-gray-100 group-hover:text-primary/10 transition-colors duration-300">
                {s.step}
              </span>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;