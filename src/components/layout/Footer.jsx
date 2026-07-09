import { Link, useNavigate, useLocation } from "react-router-dom";

const platformLinks = [
  { label: "Browse Tasks", id: "browse-tasks" },
  { label: "Top Workers", id: "top-workers" },
  { label: "How It Works", id: "how-it-works" },
  { label: "About", id: "about" },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <button onClick={() => handleScroll("home")} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-white">MicroTask</span>
            </button>
            <p className="text-sm text-gray-400 leading-relaxed">
              A trusted micro-tasking platform where workers earn and buyers get tasks done — fast, fair, and simple.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              {platformLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleScroll(item.id)}
                    className="text-gray-400 transition-colors duration-200 hover:text-primary"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleScroll("about")} className="text-gray-400 transition-colors duration-200 hover:text-primary">
                  About Us
                </button>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 transition-colors duration-200 hover:text-primary">
                  Join as Worker
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 transition-colors duration-200 hover:text-primary">
                  Join as Buyer
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 transition-colors duration-200 hover:text-primary">
                  Log In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">We Accept</h4>
            <div className="flex flex-wrap gap-2">
              {["bKash", "Nagad", "Rocket", "Bank"].map((method) => (
                <span
                  key={method}
                  className="px-3 py-1.5 bg-gray-800 text-xs font-medium rounded-md transition-colors duration-200 hover:bg-primary hover:text-white cursor-default"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">© 2026 MicroTask. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;