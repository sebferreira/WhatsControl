import {Box, CircularProgress, Typography} from "@mui/material";
import {useEffect, useRef, useState, memo} from "react";
import {getMensajesByChatId} from "../../queryFn/query";
import {useParams} from "react-router-dom";
export const MessageSection = memo(function MessageSection({mensajes}) {
  const [PreviousMessages, setPreviousMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const getPreviousMessages = async () => {
    try {
      setLoading(true);
      const data = await getMensajesByChatId(params.chatId);
      if (data) {
        setPreviousMessages(data);
      } else {
        setPreviousMessages([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPreviousMessages([]);
    setLoading(true);
    getPreviousMessages();
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
  }, [mensajesConcatenados.length, loading]);
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
      {mensajesConcatenados.length > 0 && <Box sx={{flexGrow: 1}} />}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}>
          <CircularProgress sx={{color: "white"}} />
        </Box>
      ) : mensajesConcatenados.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            opacity: 0.7,
          }}>
          No hay mensajes en este chat.
        </Typography>
      ) : (
        mensajesConcatenados.map((mensaje) => {
          const hora = new Date(mensaje.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          if (mensaje.fromMe) {
            return (
              <Box
                key={mensaje.id}
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
                key={mensaje.id}
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
        })
      )}

      <div ref={messagesEndRef} />
    </Box>
  );
});
