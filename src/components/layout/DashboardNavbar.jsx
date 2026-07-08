import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const DashboardNavbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user?.email) return;
    api
      .get(`/notifications/${user.email}/unread-count`)
      .then((res) => setUnreadCount(res.data.unreadCount))
      .catch(() => setUnreadCount(0));
  }, [user]);

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40">
      <div>
        <p className="text-sm text-gray-500">Welcome back,</p>
        <p className="font-semibold text-gray-900">{user?.displayName}</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/dashboard/${user?.role?.toLowerCase()}/notifications`)}
          className="relative p-2 rounded-lg transition-colors duration-200 hover:bg-gray-50"
        >
          <span className="text-xl">🔔</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>
        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm transition-transform duration-200 hover:scale-105 cursor-pointer">
          {user?.displayName?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;