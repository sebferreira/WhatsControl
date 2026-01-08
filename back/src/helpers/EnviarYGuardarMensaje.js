import Chat from "../models/chats.model.js";
import Mensaje from "../models/mensajes.model.js";

export default async function responderYGuardar(
  client,
  chatId,
  texto,
  etapaActual
) {
  await client.sendMessage(chatId, texto);

  await Chat.update({ultimoMensaje: texto}, {where: {id_chat: chatId}});

  await Mensaje.create({
    id_chat: chatId,
    mensaje: texto,
    to: chatId,
    fromMe: true,
    etapa: etapaActual,
  });
}
