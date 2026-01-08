import express from "express";

import {revisarCookie} from "../middlewares/authorization.middleware.js";
import {
  getClienteById,
  getClientes,
} from "../controllers/cliente.controller.js";

const routerClient = express.Router();

routerClient.get("/", revisarCookie, getClientes);
routerClient.get("/:chatId", revisarCookie, getClienteById);

export default routerClient;
