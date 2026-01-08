import responderYGuardar from "./EnviarYGuardarMensaje.js";
export async function registrar(message, client, datos) {
  const chatId = message.from;
  const input = message.body.trim();

  switch (datos[chatId].fase) {
    case "inicio":
      await responderYGuardar(
        client,
        chatId,
        "Hola, empecemos el registro. Por favor ingresa tu nombre:",
        datos[chatId].fase
      );

      datos[chatId].fase = "Ingresar_Nombre";
      break;
    case "Ingresar_Nombre":
      datos[chatId].info = {...datos[chatId].info, nombre: input};

      datos[chatId].fase = "Ingresar_Apellido";
      await responderYGuardar(
        client,
        chatId,
        "¡Un gusto " + input + "! Ahora por favor escribe tu apellido:",
        datos[chatId].fase
      );
      break;

    case "Ingresar_Apellido":
      datos[chatId].info = {...datos[chatId].info, apellido: input};

      datos[chatId].fase = "Ingresar_DNI";
      await responderYGuardar(
        client,
        chatId,
        "Ahora por favor escribe tu DNI:",
        datos[chatId].fase
      );
      break;

    case "Ingresar_DNI":
      datos[chatId].info = {...datos[chatId].info, dni: input};
      datos[chatId].fase = "finalizado";
      await responderYGuardar(
        client,
        chatId,
        "¡Registro completado!",
        datos[chatId].fase
      );
      break;
  }
}
