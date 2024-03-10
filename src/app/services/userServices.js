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

 export const getUserConversations= async(idUser)=> {
  try {
    const started = await axios.get(endpoints.messagesStarted(idUser));
    const received = await axios.get(endpoints.messageReceived(idUser));
    return [...started.data,...received.data];
  } catch (error) {
    console.error(error);
    return null;
  }
 }


