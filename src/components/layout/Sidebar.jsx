import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuByRole = {
  Worker: [
    { label: "Dashboard", path: "/dashboard/worker", icon: "📊" },
    { label: "Task List", path: "/dashboard/worker/tasks", icon: "📋" },
    { label: "My Submissions", path: "/dashboard/worker/submissions", icon: "📝" },
    { label: "Withdrawals", path: "/dashboard/worker/withdrawals", icon: "💸" },
  ],
  Buyer: [
    { label: "Dashboard", path: "/dashboard/buyer", icon: "📊" },
    { label: "Add New Task", path: "/dashboard/buyer/add-task", icon: "➕" },
    { label: "My Tasks", path: "/dashboard/buyer/tasks", icon: "📋" },
    { label: "Task To Review", path: "/dashboard/buyer/review", icon: "🔍" },
    { label: "Purchase Coin", path: "/dashboard/buyer/purchase-coin", icon: "💰" },
    { label: "Payment History", path: "/dashboard/buyer/payments", icon: "🧾" },
  ],
  Admin: [
    { label: "Dashboard", path: "/dashboard/admin", icon: "📊" },
    { label: "Manage Users", path: "/dashboard/admin/users", icon: "👥" },
    { label: "Manage Tasks", path: "/dashboard/admin/tasks", icon: "📋" },
    { label: "Withdraw Requests", path: "/dashboard/admin/withdrawals", icon: "💸" },
    { label: "Payment Requests", path: "/dashboard/admin/payments", icon: "🧾" },
  ],
};

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menu = menuByRole[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-lg font-bold text-gray-800">MicroTask</span>
        </div>
      </div>

      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
            {user?.displayName?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.displayName}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>
        {user?.role !== "Admin" && (
          <div className="mt-3 flex items-center justify-between px-3 py-2 bg-primary/5 rounded-lg">
            <span className="text-xs font-medium text-gray-600">Coin Balance</span>
            <span className="text-sm font-bold text-primary">{user?.coin} 🪙</span>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === `/dashboard/${user?.role?.toLowerCase()}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50"
        >
          <span>🚪</span>
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;