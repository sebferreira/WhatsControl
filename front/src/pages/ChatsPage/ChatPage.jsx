import {useEffect, useState, useRef} from "react";
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
  const chatIdRef = useRef(params.chatId);
  useEffect(() => {
    chatIdRef.current = params.chatId;
    setMensajes([]);
  }, [params.chatId]);

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
      const mensajeFormateado = {
        id: mensaje.id_mensaje || mensaje.id,
        id_chat: mensaje.id_chat,
        mensaje: mensaje.body || mensaje.mensaje,
        to: mensaje.to,
        fromMe: mensaje.fromMe,
        createdAt: fechaFinal.toISOString(),
      };

      const idDelChatDelMensaje = mensajeFormateado.id_chat;
      setChats((prevChats) => {
        const chatExistente = prevChats.find(
          (c) => c.id_chat === idDelChatDelMensaje
        );
        const restoChats = prevChats.filter(
          (c) => c.id_chat !== idDelChatDelMensaje
        );

        if (chatExistente) {
          const chatActualizado = {
            ...chatExistente,
            ultimoMensaje: mensajeFormateado.mensaje,
            updatedAt: new Date().toISOString(),
          };
          return [chatActualizado, ...restoChats];
        } else {
          return prevChats;
        }
      });
      const chatAbiertoActualmente = chatIdRef.current;

      if (
        chatAbiertoActualmente &&
        (idDelChatDelMensaje === chatAbiertoActualmente ||
          mensaje.to === chatAbiertoActualmente)
      ) {
        setMensajes((prev) => [...prev, mensajeFormateado]);
      }
    };

    socket.on("nuevo_mensaje", handleNewMessage);
    return () => {
      socket.off("nuevo_mensaje", handleNewMessage);
    };
  }, []);

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
