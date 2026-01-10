import Chat from "../models/chats.model.js";
import Mensaje from "../models/mensajes.model.js";
import {enviarMensajeMeta} from "./whatsappApi.js";

export default async function responderYGuardar(
  chatId,
  texto,
  etapaActual,
  io
) {
  await enviarMensajeMeta(chatId, texto);

  await Chat.update({ultimoMensaje: texto}, {where: {id_chat: chatId}});

  const nuevoMensaje = await Mensaje.create({
    id_chat: chatId,
    mensaje: texto,
    to: chatId,
    fromMe: true,
    etapa: etapaActual,
  });
  if (io) {
    io.emit("nuevo_mensaje", {
      id_mensaje: nuevoMensaje.id_mensaje,
      id_chat: nuevoMensaje.id_chat,
      mensaje: nuevoMensaje.mensaje,
      body: nuevoMensaje.mensaje,
      to: nuevoMensaje.to,
      fromMe: true,
      createdAt: nuevoMensaje.createdAt,
      pushName: "Bot/Agente",
    });
  }
  return nuevoMensaje;
}
