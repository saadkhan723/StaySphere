import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const isAdmin = localStorage.getItem("staysphere-admin");

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;