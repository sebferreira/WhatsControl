import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Box,
} from "@mui/material";
import {Link} from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ChatList({chat}) {
  return (
    <ListItem
      disablePadding
      sx={{
        width: "100%",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        backgroundColor: "#f5f5f5",
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
        "&:active": {
          backgroundColor: "#d3d3d3",
        },
        "&:focus": {
          backgroundColor: "#d3d3d3",
        },
      }}>
      <ListItemButton
        component={Link}
        to={`/chats/${chat.id_chat}`}
        onClick={() => {
          console.log(chat);
          sessionStorage.setItem("previousPath", "/chats");
          sessionStorage.setItem("actualPath", `/chats/${chat.id_chat}`);
        }}
        sx={{
          color: "#1e1e1e",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
          "&:active": {
            backgroundColor: "#d3d3d3",
          },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0",
          marginLeft: "10px",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}>
          <ListItemIcon>
            <AccountCircleRoundedIcon
              sx={{
                color: "#757575",
                fontSize: "2.5rem",
              }}
            />
          </ListItemIcon>
          <Box>
            <ListItemText
              primary={chat.id_chat /* .slice(3, -5) */}
              sx={{
                "& .MuiTypography-root": {
                  width: " 10rem",
                  overflow: "hidden",
                  textOverflow: {xs: "ellipsis", sm: "initial"},
                  whiteSpace: "nowrap",
                },
              }}
            />
            <ListItemText
              primary={chat.usuario_asignado}
              style={{
                fontSize: "0.8rem",
                color: "#757575",
                marginLeft: "5px",
              }}
            />
          </Box>
        </div>
        <ArrowForwardIosIcon
          sx={{
            color: "#757575",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
