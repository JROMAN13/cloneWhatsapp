import axios from "axios";
import { endpoints } from "./data";

export const getUser = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getATransaction = async (id) => {
  try {
    const { data } = await axios.get(endpoints.transaction(id));
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserConversations = async (idUser) => {
  try {
    const started = await axios.get(endpoints.messagesStarted(idUser));
    const received = await axios.get(endpoints.messageReceived(idUser));
    return [...started.data, ...received.data];
    // return [...received.data];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getchats = async () => {
  try {
    const mensajes = await axios.get(endpoints.messages);
    return [...mensajes.data];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getContacts = async (idUserLogged) => {
  try {
    const { data } = await axios.get(endpoints.transactions);
    const contacts = data.filter((user) => user.id !== idUserLogged);
    return contacts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAnConversation = async (idUserLogged, idContact) => {
  try {
    const conversacionIniciada = await axios.get(endpoints.getAConversation(idUserLogged, idContact));
    
    if (conversacionIniciada.data.length <= 0) {
      const conversacionRecibida = await axios.get(endpoints.getAConversation(idContact, idUserLogged));
      return conversacionRecibida.data[0]||null;
    }

    return conversacionIniciada.data[0]||null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const startAConversation = async ({ senderUser, receptorUser, message }) => {
  try {
    const url = endpoints.messages;
    const newConversation = {
      senderUser: senderUser,
      recipientUser: receptorUser,
      conversaciones: [
        {
          sendBy: senderUser,
          fecha: new Date(),
          hora: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          visto: false,
          mensaje: message,
        },
      ],
    };
    const response = await axios.post(url, newConversation);    
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendMessage = async ({ idConversation, messagesArrays, sender, newMenssage }) => {
  try {
    const url = endpoints.aConversation(idConversation);
    const mensaje = {
      sendBy: sender,
      fecha: new Date().toLocaleDateString('es-CO'),
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      visto: false,
      mensaje: newMenssage,
    };
    const response = await axios.patch(url, {
      conversaciones: [...messagesArrays, mensaje],
    });
    console.log(messagesArrays);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};



export const getConversation = async (conversationId) => {
  try {
    const response = await axios.get(endpoints.messages);

    // Obtén los mensajes de la respuesta
    const mensajes = response.data;

    // Verifica si existe la propiedad mensajes en la respuesta
    if (mensajes && Array.isArray(mensajes)) {
      for (const mensaje of mensajes) {
        if (mensaje.id === conversationId && mensaje.conversaciones) {
          return mensaje.conversaciones;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error al obtener la conversación:", error);
    return null;
  }
};


export const getConversationById = async (conversationId) => {
  try {
    const { data } = await axios.get(endpoints.aConversation(conversationId));
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}