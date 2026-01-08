import express from "express";

import {revisarCookie} from "../middlewares/authorization.middleware.js";
import {
  enviarMensaje,
  getMensajes,
  getMensajesById,
} from "../controllers/mensajes.controller.js";

const routerMsj = express.Router();

routerMsj.get("/", revisarCookie, getMensajes);
routerMsj.get("/:chatId", revisarCookie, getMensajesById);
routerMsj.post("/enviar/:chatId", revisarCookie, enviarMensaje);

export default routerMsj;
