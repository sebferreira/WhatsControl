/* import express from "express";
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
import routerMsj from "./routes/mensajes.routes.js";
import routerClient from "./routes/cliente.routes.js";
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
        origin: "https://poloweb.vercel.app",
    origin: "http://localhost:5173",
    methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  req.whatsapp = client;
  req.server = io;
  next();
});
app.use("/api/users", router);
app.use("/api/chats", routerChat);
app.use("/api/mensajes", routerMsj);
app.use("/api/clientes", routerClient);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
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
    id_chat: message.from,
    mensaje: message.body,
    fromMe: message.fromMe,
    to: message.to,
    createdAt: message.timestamp,
    pushName: message._data.notifyName,
  });
});
client.initialize();
httpServer.listen(3000, () => {
  console.log("puerto 3000");
});
 */
// Import Express.js
import express from "express";

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests
app.get("/", (req, res) => {
  const {
    "hub.mode": mode,
    "hub.challenge": challenge,
    "hub.verify_token": token,
  } = req.query;

  if (mode === "subscribe" && token === verifyToken) {
    console.log("WEBHOOK VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post("/", (req, res) => {
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
