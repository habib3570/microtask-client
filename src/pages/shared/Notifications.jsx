import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/notifications/${user.email}`);
      setNotifications(res.data);
    } catch  {
      toast.error("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    } catch  {
      toast.error("Failed to mark as read.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(notifications.filter((n) => n.id !== id));
    } catch  {
      toast.error("Failed to delete notification.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Notifications</h1>
      <p className="text-gray-500 mb-6">Stay updated with your latest activity</p>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">🔔</p>
          <p className="text-gray-500">No notifications yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`bg-white rounded-2xl border p-4 flex items-start justify-between gap-4 transition-all duration-300 hover:shadow-md ${
                n.isRead ? "border-gray-100" : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="flex items-start gap-3">
                {!n.isRead && <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>}
                <div>
                  <p className="text-sm text-gray-800">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(n.time).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    className="text-xs font-medium text-primary transition-colors duration-200 hover:text-primary-dark"
                  >
                    Mark read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(n.id)}
                  className="text-xs font-medium text-red-400 transition-colors duration-200 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;