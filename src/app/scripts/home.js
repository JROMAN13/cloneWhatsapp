import "../styles/home.scss";
import { getAnConversation, startAConversation, sendMessage, getConversation } from "../services/userServices";
import { listarContactos, mostrarChat } from "../modules/printHome";
import { getchats, getContacts } from "../services/userServices";


const idUserLogged = "1";
const contactContainer = document.querySelector("#chats");
const chatsContainer = document.querySelector(".chat-container");
const inputElement = document.querySelector("#inputSendMessage");
let chats = [];

document.addEventListener("DOMContentLoaded", function () {
  listarContactos(idUserLogged, contactContainer);
});

document.addEventListener("click", async function (event) {
  if (event.target.getAttribute("data-click")) {
    const idContacto = event.target.getAttribute("data-click");
    const conversacion = await getAnConversation(idUserLogged, idContacto);
    chats = await getchats();
    console.log(chats);

    mostrarChat(chatsContainer, chats, idUserLogged);
  }
});

inputElement.addEventListener("keydown", async function (event) {
  if (event.keyCode === 13) {
    // Verifica si la tecla presionada es 'Enter'
    const message = inputElement.value.trim(); // Obtiene el mensaje y elimina los espacios en blanco al principio y al final

    // Verifica si el mensaje no está vacío
    if (message !== "") {
      
      
      const senderUser = 1;
      const idConversacion = 1;
      const mesagges = await getAnConversation(1, 2);
      console.log(mesagges);
      await sendMessage({
        idConversation: idConversacion,
        messagesArrays: mesagges.conversaciones,
        sender: senderUser,
        newMenssage: message,
      });
      chats = await getchats();
      mostrarChat(chatsContainer, chats, idUserLogged);
      inputElement.value = "";
    }
  }
});
