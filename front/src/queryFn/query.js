import {handleCustomApiRequest} from "../shared/clientShared.js";

const URL = "https://whatsapp-auto-p2eg.onrender.com/api";

function verifyCookies() {
  return handleCustomApiRequest({
    url: `${URL}/users/verify`,
    method: "GET",
    withToken: true,
  });
}

function signIn(body) {
  return handleCustomApiRequest({
    url: `${URL}/users/login`,
    method: "POST",
    body,
  });
}
function signUp(body) {
  return handleCustomApiRequest({
    url: `${URL}/users/register`,
    method: "POST",
    body,
    withToken: true,
  });
}
function userLogout() {
  return handleCustomApiRequest({
    url: `${URL}/logout`,
    method: "POST",
    withToken: true,
  });
}
function getChats() {
  return handleCustomApiRequest({
    url: `${URL}/chats/`,
    method: "GET",
    withToken: true,
  });
}
function getChatsById(chatId) {
  return handleCustomApiRequest({
    url: `${URL}/chats/${chatId}`,
    method: "GET",
    withToken: true,
  });
}
function asignarChat(chatId) {
  return handleCustomApiRequest({
    url: `${URL}/chats/asignar/${chatId}`,
    method: "PATCH",
    withToken: true,
  });
}
function modificarEstadoChat(chatId) {
  return handleCustomApiRequest({
    url: `${URL}/chats/estado/${chatId}`,
    method: "PATCH",
    withToken: true,
  });
}
function getMensajes() {
  return handleCustomApiRequest({
    url: `${URL}/mensajes/`,
    method: "GET",
    withToken: true,
  });
}
function getMensajesByChatId(chatId) {
  return handleCustomApiRequest({
    url: `${URL}/mensajes/${chatId}`,
    method: "GET",
    withToken: true,
  });
}
function enviarMSJ(body, chatId) {
  return handleCustomApiRequest({
    url: `${URL}/mensajes/enviar/${chatId}`,
    method: "POST",
    withToken: true,
    body,
  });
}
function getClientes() {
  return handleCustomApiRequest({
    url: `${URL}/clientes/`,
    method: "GET",
    withToken: true,
  });
}
function getClientesByChatId(chatId) {
  return handleCustomApiRequest({
    url: `${URL}/clientes/${chatId}`,
    method: "GET",
    withToken: true,
  });
}
export {
  verifyCookies,
  signIn,
  signUp,
  userLogout,
  getChats,
  getChatsById,
  asignarChat,
  modificarEstadoChat,
  getMensajes,
  getMensajesByChatId,
  enviarMSJ,
  getClientes,
  getClientesByChatId,
};
