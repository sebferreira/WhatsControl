import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {Box, CircularProgress} from "@mui/material";
function AdminProtectedRoutes() {
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}>
        <CircularProgress sx={{color: "white"}} />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/chats" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoutes;
