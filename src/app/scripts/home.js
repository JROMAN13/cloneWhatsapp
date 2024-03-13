import "../styles/home.scss";
import { getAnConversation } from "../services/userServices";
import { listarContactos } from "../modules/printHome";

const idUserLogged = "1";
const contactContainer = document.querySelector("#chats");

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
  }
});
