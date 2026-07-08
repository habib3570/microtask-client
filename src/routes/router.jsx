import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import WorkerDashboard from "../pages/worker/WorkerDashboard";
import TaskList from "../pages/worker/TaskList";
import TaskDetails from "../pages/worker/TaskDetails";
import MySubmissions from "../pages/worker/MySubmissions";
import Withdrawals from "../pages/worker/Withdrawals";
import BuyerDashboard from "../pages/buyer/BuyerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import RoleRoute from "./RoleRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard/worker",
    element: (
      <RoleRoute allowedRoles={["Worker"]}>
        <DashboardLayout />
      </RoleRoute>
    ),
    children: [
      { index: true, element: <WorkerDashboard /> },
      { path: "tasks", element: <TaskList /> },
      { path: "tasks/:id", element: <TaskDetails /> },
      { path: "submissions", element: <MySubmissions /> },
      { path: "withdrawals", element: <Withdrawals /> },
    ],
  },
  {
    path: "/dashboard/buyer",
    element: (
      <RoleRoute allowedRoles={["Buyer"]}>
        <DashboardLayout />
      </RoleRoute>
    ),
    children: [{ index: true, element: <BuyerDashboard /> }],
  },
  {
    path: "/dashboard/admin",
    element: (
      <RoleRoute allowedRoles={["Admin"]}>
        <DashboardLayout />
      </RoleRoute>
    ),
    children: [{ index: true, element: <AdminDashboard /> }],
  },
]);