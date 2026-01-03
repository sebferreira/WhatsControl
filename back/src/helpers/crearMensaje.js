import Mensaje from "../models/mensajes.model.js";
import {registrar} from "./registro.js";

export async function enviarMensajes(message, client, datos, chat) {
  if (message.fromMe) return;

  const input = message.body.trim();
  const chatId = message.from;
  if (!datos[chatId]) {
    datos[chatId] = {
      fase: "inicio",
      info: {},
    };
  }
  await Mensaje.create({
    id_chat: chatId,
    mensaje: message.body,
    fromMe: message.fromMe,
    etapa: datos[chatId].fase,
  });
  registrar(message, client, datos);

  if (datos[chatId].fase === "finalizado") {
    const usuario = JSON.stringify(datos[chatId].info);
    await chat.update({usuario});
    switch (input) {
      case "1":
        await client.sendMessage(message.from, "ventas");
        datos[chatId].fase = "confirmar";

        break;

      case "2":
        await client.sendMessage(message.from, "compras");
        datos[chatId].fase = "confirmar";

        break;

      case "3":
        await client.sendMessage(message.from, "los pagos se realizan con mp");
        datos[chatId].fase = "confirmar";

        break;
      default:
        await client.sendMessage(
          message.from,
          "Debes elegir una opcion: 1.ventas 2.compra 3.pagos"
        );
        break;
    }
  }

  if (datos[chatId].fase === "confirmar") {
    await client.sendMessage(
      message.from,
      ` nombre:${datos[chatId].info.nombre} apellido:${datos[chatId].info.apellido} DNI:${datos[chatId].info.dni} Si lo anterior es correcto escriba "confirmar", de lo contrario escriba "reintentar"`
    );
    datos[chatId].fase = "pendiente";
  }

  if (datos[chatId].fase === "pendiente") {
    if (input === "reintentar") {
      await client.sendMessage(message.from, "Por favor ingresa tu nombre:");
      datos[chatId].fase = "Ingresar_Nombre";
    }

    if (input === "confirmar") {
      await client.sendMessage(message.from, "Gracias por registrarse");
      datos[chatId].fase = "confirmado";
    }
  }
}
