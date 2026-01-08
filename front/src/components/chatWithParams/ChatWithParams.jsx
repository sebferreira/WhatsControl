import {Box, Button, Drawer, List, TextField, Typography} from "@mui/material";
import ChatList from "../../components/chatCard/chatList";
import ChatDrawer from "../../components/chatCard/drawer";
import NavbarChat from "../navbar/NavbarChat";
import {MessageSection} from "../MessageSection/MessageSection";
import {useForm} from "react-hook-form";
import {enviarMSJ} from "../../queryFn/query.js";
import {useParams} from "react-router-dom";
import {useState} from "react";
export function ChatWithParams({chats}) {
  const [mensaje, setMensaje] = useState("");
  const {handleSubmit} = useForm();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    data.mensaje = mensaje;
    setMensaje("");
    await enviarMSJ(data, params.chatId);
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}>
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexShrink: 0,
        }}>
        <NavbarChat chats={chats} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }}>
        <Drawer
          container={window.document.body}
          variant="permanent"
          anchor="left"
          open={true}
          sx={{
            display: {xs: "none", md: "flex"},
            zIndex: 0,
          }}
          PaperProps={{
            sx: {
              backgroundColor: "transparent",
              color: "white",
              borderRight: 0,
              width: 560,
              marginTop: "3.5rem",
              overflowY: "auto",
              top: 0,
            },
          }}>
          <ChatDrawer chats={chats} />
        </Drawer>
        <MessageSection />
      </Box>
      <Box
        sx={{
          width: {xs: "100vw", md: "auto"},
          maxWidth: "100vw",
          paddingTop: "0.5rem",
          marginLeft: {xs: 0, md: "400px", lg: "500px", xl: "560px"},
          display: {sm: "flex ", md: "flex"},
          minWidth: {sm: "30rem"},
          justifyContent: "center",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "1rem",
            padding: {sm: "1rem", xs: "0 0 1rem 0"},
            width: {xs: "90% ", md: "calc(100% - 200px)"},
          }}>
          <form
            onSubmit={onSubmit}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
              width: "100%",
              margin: " 0 auto",
            }}>
            <TextField
              fullWidth
              value={mensaje}
              multiline
              maxRows={4}
              variant="outlined"
              placeholder="Escribe tu mensaje..."
              style={{
                scrollbarColor: "#484848ff transparent",
                scrollbarWidth: "thin",
                scrollbarGutter: "stable",
                height: "100%",
                backgroundColor: "#111111ff",
              }}
              sx={{
                display: "block",
                paddingLeft: "0.5rem",
                height: "100%",
                borderRadius: "20px",
                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiInputBase-root": {
                  color: "white",
                  width: "100%",
                  height: "100%",
                },
                "& input:-webkit-autofill": {
                  transition: "background-color 600000s 0s, color 600000s 0s",
                },
              }}
              type="text"
              fontWeight="bold"
              onChange={(e) => setMensaje(e.target.value)}
              size="small"
            />
            {mensaje ? (
              <Button
                disabled={!mensaje}
                onClick={onSubmit}
                variant="contained"
                type="submit"
                style={{
                  height: "100%",
                  backgroundColor: "#3B82F6",
                  borderColor: "#9ecaed",
                  boxShadow: "0 0 10px #2297f7ff",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}>
                Enviar
              </Button>
            ) : (
              <></>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
}
