import "../styles/home.scss";
import { getAnConversation, getUser, getATransaction} from "../services/userServices";
import { listarContactos, mostrarChat } from "../modules/printHome";
import { endpoints } from "../services/data";
import { getchats, getContacts } from "../services/userServices";

const idUserLogged = "1";
const contactContainer = document.querySelector("#chats");
const chatsContainer = document.querySelector(".chat-container");
let transactions = [];

document.addEventListener("DOMContentLoaded", function () {
  // const idUserLogged = "idUserLogged";
  // const contactsContainer = document.getElementById("contactsContainer");
  listarContactos(idUserLogged, contactContainer);
});

document.addEventListener("click", async function (event) {
  if (event.target.getAttribute("data-click")) {
    const idContacto = event.target.getAttribute("data-click");
    const conversacion = await getAnConversation(idUserLogged, idContacto);
    console.log(conversacion);
    transactions = await getchats();
    console.log(transactions);
   
    mostrarChat(chatsContainer, transactions, idUserLogged);
  }
});


// document.addEventListener("click", async function (event) {
  
//   if (event.target.getAttribute("data-click")) {
//     const idContacto = event.target.getAttribute("data-click");
//     const conversacion = await getAnConversation(idUserLogged, idContacto);
//     console.log(conversacion);
//     transactions = await getchats();
//     console.log(transactions);
//     mostrarChat(chatsContainer, transactions);
//   }
// });
