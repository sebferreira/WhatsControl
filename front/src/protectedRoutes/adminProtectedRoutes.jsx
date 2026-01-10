import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function AdminProtectedRoutes() {
  const {user} = useAuth();
  if (user) {
    if (user.role !== "admin") {
      return <Navigate to="/chats" replace />;
    }
    return <Outlet />;
  }
}

export default AdminProtectedRoutes;
