import {Box, Container, Typography} from "@mui/material";
import {useEffect, useRef, useState, memo} from "react";
import {getMensajesByChatId} from "../../queryFn/query";
import {useParams} from "react-router-dom";
import io from "socket.io-client";
const socket = io("https://whatsapp-auto-p2eg.onrender.com");
export const MessageSection = memo(function MessageSection({mensajes}) {
  console.log(mensajes);
  const [PreviousMessages, setPreviousMessages] = useState([]);
  const params = useParams();
  const getPreviousMessages = async () => {
    const data = await getMensajesByChatId(params.chatId);
    if (data.length === 0) {
      return console.log(data);
    }
    setPreviousMessages(data);
  };
  useEffect(() => {
    const cargarDatos = async () => {
      setPreviousMessages([]);

      getPreviousMessages();
    };
    cargarDatos();
  }, [params.chatId]);

  const messagesEndRef = useRef(null);
  const socketMessagesEsteChat = mensajes.filter((mensaje) => {
    return mensaje.id_chat === params.chatId || mensaje.to === params.chatId;
  });
  const mapaMensajes = new Map();

  PreviousMessages.forEach((msg) => {
    const id = msg.id || msg.id_mensaje;
    if (id) mapaMensajes.set(String(id), msg);
  });

  socketMessagesEsteChat.forEach((msg) => {
    const id = msg.id || msg.id_mensaje;
    if (id) mapaMensajes.set(String(id), msg);
  });

  const mensajesConcatenados = Array.from(mapaMensajes.values()).sort(
    (a, b) => {
      const fechaA = new Date(a.createdAt || Date.now());
      const fechaB = new Date(b.createdAt || Date.now());
      return fechaA - fechaB;
    }
  );
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensajesConcatenados.length]);
  return (
    <Box
      sx={{
        marginLeft: {xs: 0, md: "400px", lg: "500px", xl: "560px"},
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        paddingBottom: "20px",
        scrollbarColor: "#484848ff transparent",
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
        paddingRight: {xs: 0, sm: "3rem"},
        paddingLeft: {xs: 0, sm: "4rem"},
      }}>
      {mensajesConcatenados.map((mensaje) => {
        const hora = new Date(mensaje.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        if (mensaje.fromMe) {
          return (
            <Box
              key={mensaje.id} // LA KEY VA AQUÍ
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                padding: "10px",
                marginRight: "2rem",
              }}>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  backgroundColor: "#3262e7",
                  borderRadius: "10px",
                  padding: "10px",
                  maxWidth: "60%",
                  wordWrap: "break-word",
                }}>
                {mensaje.mensaje || mensaje.body}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "gray",
                  fontSize: "0.75rem",
                  marginTop: "5px",
                }}>
                {hora}
              </Typography>
            </Box>
          );
        } else {
          return (
            <Box
              key={mensaje.id} // LA KEY VA AQUÍ
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "10px",
                marginLeft: "2rem",
              }}>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: "60%",
                  color: "white",
                  backgroundColor: "#434548ff",
                  borderRadius: "10px",
                  padding: "10px",
                  wordWrap: "break-word",
                }}>
                {mensaje.mensaje}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "gray",
                  fontSize: "0.75rem",
                  marginTop: "5px",
                }}>
                {hora}
              </Typography>
            </Box>
          );
        }
      })}

      <div ref={messagesEndRef} />
    </Box>
  );
});
