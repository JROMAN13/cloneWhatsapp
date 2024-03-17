const URL_BASE = "http://localhost:3000/";

export const endpoints = {
  transactions: `${URL_BASE}usuarios`,
  transaction: (id) => `${URL_BASE}usuarios/${id}`,
  getAnUser: (celular, contraseña) => `${URL_BASE}usuarios?celular=${celular}&contraseña=${contraseña}`,
  messages: `${URL_BASE}mensajes`,
  messagesStarted: (senderUser) => `${URL_BASE}mensajes?senderUser=${senderUser}`,
  messageReceived: (recipientUser) => `${URL_BASE}mensajes?recipientUser=${recipientUser}`,
  getAConversation: (idUser1, idUser2) => `${URL_BASE}mensajes?senderUser=${idUser1}&recipientUser=${idUser2}`,
  aConversation: (id) => `${URL_BASE}mensajes/${id}`,
  //message: (id)=>`${URL_BASE}mensajes?id=${id}`,
};
