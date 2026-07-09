import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Browse Tasks", id: "browse-tasks" },
  { label: "Top Workers", id: "top-workers" },
  { label: "About", id: "about" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const dashboardPath = user
    ? user.role === "Admin"
      ? "/dashboard/admin"
      : user.role === "Buyer"
      ? "/dashboard/buyer"
      : "/dashboard/worker"
    : "/";

  const handleNavClick = (id) => {
    setMenuOpen(false);
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
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => handleNavClick("home")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              Micro<span className="text-primary">Task</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative text-gray-600 font-medium text-sm transition-colors duration-200 hover:text-primary after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-lg">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {user.displayName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.displayName}</span>
                </div>
                <Link
                  to={dashboardPath}
                  className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Go to Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-100"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2 animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left px-3 py-2 text-gray-600 rounded-lg transition-colors hover:bg-gray-50 hover:text-primary"
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-2 pt-2">
              {user ? (
                <Link to={dashboardPath} className="flex-1 text-center px-4 py-2 bg-primary text-white rounded-lg transition-colors hover:bg-primary-dark">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="flex-1 text-center px-4 py-2 border border-gray-200 rounded-lg transition-colors hover:bg-gray-50">
                    Log In
                  </Link>
                  <Link to="/register" className="flex-1 text-center px-4 py-2 bg-primary text-white rounded-lg transition-colors hover:bg-primary-dark">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;