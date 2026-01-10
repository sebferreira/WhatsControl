import {AppBar, IconButton, Toolbar, Typography, Box} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function Navbar() {
  const {user} = useAuth();
  const location = useLocation();
  let ancho = {xs: "100%", md: "400px", lg: "500px", xl: "560px"};
  let mostrar = "none";
  if (user) {
    if (user.role === "admin") {
      if (location.pathname != "/clientes") {
        ancho = {xs: "100%", md: "400px", lg: "500px", xl: "560px"};
        mostrar = "flex";
      } else {
        ancho = "100%";
        mostrar = "none";
      }
    } else {
      mostrar = "none";
      ancho = {xs: "100%", md: "400px", lg: "500px", xl: "560px"};
    }
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "0",
          background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
          width: ancho,
        }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: {xs: "3.5rem", md: "5rem"},
            minHeight: {xs: "3.5rem", md: "5rem"},
          }}>
          <Box
            style={{
              display: "flex",
              gap: "5px",
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
            }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: {xs: "1.25rem", xl: "1.5rem", alignContent: "center"},
              }}>
              <Link
                to="/chats"
                style={{
                  textDecoration: "none",
                  color: "#FFFF",
                  fontWeight: "bold",
                }}>
                ChatBot
              </Link>
            </Typography>
            <Link
              to="/clientes"
              style={{
                textDecoration: "none",
                display: mostrar,
                color: "#2359d4",
                fontWeight: "bold",
              }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: {
                    xs: "1.25rem",
                    xl: "1.5rem",
                    height: "100%",
                    alignContent: "center",
                    backgroundColor: "#fff",
                    fontWeight: "bold",
                    paddingInline: "1rem",
                  },
                }}>
                Clientes
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
