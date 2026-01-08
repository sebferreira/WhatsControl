import {Box, Container, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {getMensajesByChatId} from "../../queryFn/query";
import io from "socket.io-client";
import {useParams} from "react-router-dom";
const socket = io("http://localhost:3000");
export function MessageSection() {
  const [mensajes, setMensajes] = useState([]);
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
      setMensajes([]);
      setPreviousMessages([]);

      getPreviousMessages();
    };
    cargarDatos();
  }, [params.chatId]);

  useEffect(() => {
    const handleNewMessage = (mensaje) => {
      console.log("Llegó mensaje nuevo:", mensaje);
      const mensajeFormateado = {
        id: Date.now() + Math.random(),
        id_chat: mensaje.id_chat,
        mensaje: mensaje.body || mensaje.mensaje,
        to: mensaje.to,
        fromMe: mensaje.fromMe,
        createdAt: mensaje.createdAt
          ? new Date(mensaje.createdAt * 1000).toISOString()
          : new Date().toISOString(),
      };

      setMensajes((prev) => [...prev, mensajeFormateado]);
      console.log(mensaje);
    };

    socket.on("nuevo_mensaje", handleNewMessage);
    return () => {
      socket.off("nuevo_mensaje", handleNewMessage);
    };
  }, []);
  const messagesEndRef = useRef(null);
  /*  const filtrarPorId = mensajes.filter((mensaje) => {
    return mensaje.id_chat === params.chatId || mensaje.to === params.chatId;
  });
  const mensajesOrdenadosPorHorario = filtrarPorId.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  const mensajesConcatenados = PreviousMessages.concat(mensajesOrdenadosPorHorario); */
  const MensajesfiltradosPorId = mensajes.filter((mensaje) => {
    return mensaje.id_chat === params.chatId || mensaje.to === params.chatId;
  });
  const mensajesConcatenados = [
    ...PreviousMessages,
    ...MensajesfiltradosPorId,
  ].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };
  useEffect(() => {
    scrollToBottom();
  }, [mensajesConcatenados]);
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
        return (
          <>
            {mensaje.fromMe ? (
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
                    backgroundColor: "#3B82F6",
                    borderRadius: "10px",
                    padding: "10px",
                    maxWidth: "60%",
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
            ) : (
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
                  }}>
                  {mensaje.mensaje}
                </Typography>{" "}
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
            )}
          </>
        );
      })}

      <div ref={messagesEndRef} />
    </Box>
  );
}
