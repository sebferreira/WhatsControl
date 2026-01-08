import {AppBar, IconButton, Toolbar, Typography, Box} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "0",
          backgroundColor: "#3B82F6",
        }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "3rem",
            minHeight: "3.5rem",
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
