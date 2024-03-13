import "../styles/home.scss";
import { getUserConversations, getchats } from "../services/userServices";
import { printMensajes, listarContactos } from "../modules/printHome";

const idUserLogged = "1";
const contactContainer = document.getElementById("chats");
