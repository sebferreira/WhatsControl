import {Box, Container, Typography} from "@mui/material";
import {useEffect, useRef, useState, memo} from "react";
import {getMensajesByChatId} from "../../queryFn/query";
import {useParams} from "react-router-dom";
import io from "socket.io-client";
const socket = io("https://whatsapp-auto-p2eg.onrender.com");
export const MessageSection = memo(function MessageSection({mensajes}) {
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

  console.log(mensajes);
  /* const MensajesfiltradosPorId = mensajes.filter((mensaje) => {
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
  console.log(mensajesConcatenados); */
  const MensajesfiltradosPorId = mensajes.filter((mensaje) => {
    return mensaje.id_chat === params.chatId || mensaje.to === params.chatId;
  });
  const socketLimpio = MensajesfiltradosPorId.filter((msgSocket) => {
    // Buscamos si existe un gemelo en el historial
    const existeEnHistorial = PreviousMessages.some((msgHistorial) => {
      // 1. Comparar Texto (ignorando espacios extra)
      const textoHistorial = (msgHistorial.mensaje || "").trim();
      const textoSocket = (msgSocket.mensaje || msgSocket.body || "").trim();
      const mismoTexto = textoHistorial === textoSocket;

      // 2. Comparar Fechas con margen de error (2 segundos)
      const tiempoHistorial = new Date(msgHistorial.createdAt).getTime();
      const tiempoSocket = new Date(msgSocket.createdAt).getTime();
      const diferencia = Math.abs(tiempoHistorial - tiempoSocket);

      // Si hay menos de 2000ms (2 segundos) de diferencia, asumimos que es el mismo momento
      const mismaFechaAprox = diferencia < 2000;

      // 3. Comparación por ID (si ambos tienen ID real de base de datos)
      // Esto ayuda si tu backend ya devuelve el ID real en el socket
      const mismoId =
        msgSocket.id && msgHistorial.id && msgSocket.id === msgHistorial.id;

      // Es duplicado si: (Mismo ID) O (Mismo Texto Y Misma Fecha Aprox)
      return mismoId || (mismoTexto && mismaFechaAprox);
    });

    // Si existe en el historial, NO lo queremos en la lista del socket
    return !existeEnHistorial;
  });

  // 3. Unimos y Ordenamos
  const mensajesConcatenados = [...PreviousMessages, ...socketLimpio].sort(
    (a, b) => {
      const fechaA = new Date(a.createdAt || Date.now());
      const fechaB = new Date(b.createdAt || Date.now());
      return fechaA - fechaB;
    }
  );

  // --------------------------------

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensajesConcatenados.length]);
  console.log(mensajesConcatenados);
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
