const testimonials = [
  { name: "Rafiq Ahmed", role: "Worker", text: "I earn extra income every week doing simple tasks. Payment is always on time via bKash.", avatar: "bg-indigo-400" },
  { name: "Sadia Islam", role: "Buyer", text: "Got 50 submissions for my task within a day. Great quality workers on this platform.", avatar: "bg-emerald-400" },
  { name: "Karim Hossain", role: "Worker", text: "Best micro-tasking platform for students. Withdrawal process is super smooth.", avatar: "bg-amber-400" },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">What Our Users Say</h2>
          <p className="text-gray-500">Real feedback from real workers and buyers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex text-amber-400 mb-4">{"★".repeat(5)}</div>
             <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.avatar} flex items-center justify-center text-white font-bold`}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;