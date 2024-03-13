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

export const getUserConversations = async (idUser) => {
  try {
    //const started = await axios.get(endpoints.messagesStarted(idUser));
    const received = await axios.get(endpoints.messageReceived(idUser));
    console.log("funciona", received);
    //return [...started.data, ...received.data];
    return [...received.data];
  } catch (error) {
    console.error(error);
    return null;
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
    console.log(data);
    const contacts = data.filter((user) => user.id !== idUserLogged);
    console.log(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
    return [];
  }
};
