import {AppBar, IconButton, Toolbar, Typography, Box} from "@mui/material";
import {Link, useLocation} from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  let ancho;
  if (location.pathname != "/clientes") {
    ancho = {xs: "100%", md: "400px", lg: "500px", xl: "560px"};
  } else {
    ancho = "100%";
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
              alignItems: "flex-end",
            }}>
            <Typography
              variant="h6"
              sx={{fontSize: {xs: "1.25rem", xl: "1.5rem"}}}>
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
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
