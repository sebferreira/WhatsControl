import {AppBar, Box, Button, Modal, Toolbar, Drawer} from "@mui/material";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ChatMenu from "../Menu/ChatMenu/ChatMenu";
export default function NavbarChat({chats}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const chat = chats.find((chat) => chat.id_chat === params.chatId);
  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: " 0px 4px 10px rgba(0, 0, 0, 0.7)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundColor: "#19181d ",
          width: {
            xs: "100%",
            md: "calc(100% - 400px)",
            lg: "calc(100% - 500px)",
            xl: "calc(100% - 560px)",
          },
        }}>
        <Toolbar
          sx={{
            display: "flex",
            height: {xs: "3.5rem", md: "5rem"},
            minHeight: {xs: "3.5rem", md: "5rem"},
            justifyContent: "space-between",
            padding: {xs: 0},
            flexDirection: "row",
          }}>
          {params.chatId && (
            <>
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  marginLeft: {xs: "0", md: "1rem"},
                }}>
                <Button
                  onClick={() => {
                    navigate("/chats");
                  }}
                  sx={{
                    color: "white",
                    borderRadius: "100%",
                    minWidth: "fit-content",
                    "&:hover": {
                      backgroundColor: "rgba(62, 61, 61, 0.14)",
                    },
                    display: {xs: "flex", md: "none"},
                  }}>
                  <ArrowBackIosNewRoundedIcon />
                </Button>
                <span
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "white",
                  }}>
                  {params.chatId /* .slice(0, -5) */}
                </span>
              </Box>
              <ChatMenu chat={chat} />
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
