import "../styles/home.scss";
import { getUserConversations, getchats } from "../services/userServices";
import { printMensajes } from "../modules/printHome";

//abrir el chat

const data = async () => {
  const data = await getUserConversations(1);
  printMensajes(data);
};
data();
