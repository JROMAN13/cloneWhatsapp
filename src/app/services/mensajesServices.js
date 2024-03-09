import axios from "axios";
import { endpoints } from "./data";
export const getMensajes = async () => {
  try {
    const { data } = await axios.get(endpoints.getMensajesByUser(1));
    return data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
