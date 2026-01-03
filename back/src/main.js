import express from "express";
import pkg from "whatsapp-web.js";
import {createServer} from "http";
import {Server} from "socket.io";
const {Client, LocalAuth} = pkg;
import qrcode from "qrcode-terminal";
import {enviarMensajes} from "./helpers/crearMensaje.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import Mensaje from "./models/mensajes.model.js";
import Chat from "./models/chats.model.js";
import router from "./routes/user.routes.js";
import routerChat from "./routes/chat.routes.js";
const app = express();
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
  puppeteer: {
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});
app.use(
  cors({
    credentials: true,
    /*     origin: "https://poloweb.vercel.app", */
    origin: "http://localhost:5173",
    methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use("/api/users", router);
app.use("/api/chats", routerChat);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Tu frontend
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(">> Un agente se conectó desde el Frontend: " + socket.id);

  socket.on("disconnect", () => {
    console.log("<< Agente desconectado");
  });
});

client.on("qr", (qr) => {
  qrcode.generate(qr, {small: true});
  io.emit("qr_code", qr);
});
client.on("ready", () => {
  console.log("el cliente esta listo!");
});
const MOMENTO_INICIO = Math.floor(Date.now() / 1000);

const datos = {};
client.on("message_create", async (message) => {
  if (message.timestamp < MOMENTO_INICIO) {
    console.log("Mensaje viejo ignorado:", message.body);
    return;
  }

  const [chat, created] = await Chat.findOrCreate({
    where: {
      id_chat: message.from,
    },
  });
  await enviarMensajes(message, client, datos, chat);
  io.emit("nuevo_mensaje", {
    from: message.from,
    body: message.body,
    fromMe: message.fromMe,
    timestamp: message.timestamp,
    pushName: message._data.notifyName,
  });
});
client.initialize();
httpServer.listen(3000, () => {
  console.log("puerto 3000");
});
