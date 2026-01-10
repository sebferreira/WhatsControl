import {useEffect, useState} from "react";
import {getChats} from "../../queryFn/query";
import {useParams} from "react-router-dom";
import {ChatWithParams} from "../../components/chatWithParams/ChatWithParams";
import {ChatWithoutParams} from "../../components/chatWithoutParams/ChatWithoutParams";
const socket = io("https://whatsapp-auto-p2eg.onrender.com");
import io from "socket.io-client";
export function ChatPage() {
  const [chats, setChats] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const params = useParams();
  const getAllChats = async () => {
    const data = await getChats();
    if (data.length === 0) {
      return console.log(data);
    }
    setChats(data);
  };

  useEffect(() => {
    getAllChats();
  }, []);
  useEffect(() => {
    const handleNewMessage = (mensaje) => {
      console.log("Llegó mensaje nuevo:", mensaje);
      let fechaFinal;
      const fechaEntrante =
        mensaje.createdAt || mensaje.timestamp || Date.now();

      if (!isNaN(fechaEntrante)) {
        const timestamp = Number(fechaEntrante);
        fechaFinal = new Date(
          timestamp < 100000000000 ? timestamp * 1000 : timestamp
        );
      } else {
        fechaFinal = new Date(fechaEntrante);
      }

      if (isNaN(fechaFinal.getTime())) {
        fechaFinal = new Date();
      }
      // -------------------------
      console.log(mensaje);
      const mensajeFormateado = {
        id: mensaje.id || Date.now() + Math.random(),
        id_chat: mensaje.id_chat,
        mensaje: mensaje.body || mensaje.mensaje,
        to: mensaje.to,
        fromMe: mensaje.fromMe,
        createdAt: fechaFinal.toISOString(),
      };

      setMensajes((prev) => [...prev, mensajeFormateado]);
    };

    socket.on("nuevo_mensaje", handleNewMessage);
    return () => {
      socket.off("nuevo_mensaje", handleNewMessage);
    };
  }, []);
  console.log(mensajes);

  return (
    <>
      {params.chatId ? (
        <ChatWithParams chats={chats} mensajes={mensajes} />
      ) : (
        <ChatWithoutParams chats={chats} mensajes={mensajes} />
      )}
    </>
  );
}
