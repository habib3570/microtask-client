/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    const path =
      user.role === "Admin" ? "/dashboard/admin" : user.role === "Buyer" ? "/dashboard/buyer" : "/dashboard/worker";
    return <Navigate to={path} replace />;
  }

  return children;
};

export default PublicRoute;