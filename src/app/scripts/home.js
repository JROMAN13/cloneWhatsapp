import "../styles/home.scss";
import { getAnConversation, startAConversation, sendMessage,getConversationById, getConversation, getchats, getContacts } from "../services/userServices";
import { listarContactos, mostrarChat } from "../modules/printHome";

const idUserLogged = JSON.parse(localStorage.getItem("userId")) || "1";
const contactContainer = document.querySelector("#chats");
const chatsContainer = document.querySelector(".chat-container");
const inputElement = document.querySelector("#inputSendMessage");
let conversacion;
let idContacto;
let chats = [];

document.addEventListener("DOMContentLoaded", function () {
  listarContactos(idUserLogged, contactContainer);
});

document.addEventListener("click", async function (event) {
  if (event.target.getAttribute("data-click")) {
    idContacto = event.target.getAttribute("data-click");
    conversacion = await getAnConversation(idUserLogged, idContacto);
    console.log(conversacion);
    // chats = await getchats();
    chats = conversacion?.conversaciones || [];
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
      const senderUser = idUserLogged;
      let idConversacion = conversacion?.id||null;
      //const mesagges = await getAnConversation(1, 2);
      const mesagges = conversacion?.conversaciones || [];
      console.log(message);
      if (idConversacion) {
        const response = await sendMessage({
          idConversation: idConversacion,
          messagesArrays: mesagges,
          sender: senderUser,
          newMenssage: inputElement.value,
        });        
        //mesagges.push(response.data);
      } else {
        const response = await startAConversation({ senderUser: senderUser, receptorUser: idContacto, message: inputElement.value });
        conversacion = response.data;
        idConversacion = conversacion.id
        // console.log(conversacion);
        // const chat = conversacion?.conversaciones||[]
        // mesagges.push(...chat);
      }
      conversacion = await getConversationById(idConversacion);
      chats = conversacion.conversaciones;
      mostrarChat(chatsContainer, chats, idUserLogged);      
      inputElement.value = "";
    }
  }
});
