import express from "express";

import {revisarCookie} from "../middlewares/authorization.middleware.js";

import {
  agregarUserChat,
  asignarChat,
  createChat,
  getChatById,
  getChats,
  modificarEstadoChat,
} from "../controllers/chat.controller.js";

const routerChat = express.Router();

routerChat.get("/", revisarCookie, getChats);
routerChat.get("/:chatId", revisarCookie, getChatById);
routerChat.post("/", revisarCookie, createChat);
routerChat.patch("/asignar/:chatId", revisarCookie, asignarChat);
routerChat.patch("/estado/:chatId", revisarCookie, modificarEstadoChat);
/* routerChat.patch("/user/:chatId", revisarCookie, agregarUserChat);
 */
export default routerChat;
