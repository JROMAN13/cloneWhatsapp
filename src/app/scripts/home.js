import "../styles/home.scss";
import { getAnConversation, startAConversation, sendMessage,getConversationById, getContacts, guardarCambiosContacto, getATransaction } from "../services/userServices";
import { listarContactos, mostrarChat, printHeaderUser } from "../modules/printHome";

const idUserLogged = JSON.parse(localStorage.getItem("userId")) || "1";
const contactContainer = document.querySelector("#chats");
const chatsContainer = document.querySelector(".chat-container");
const headerUserContainer = document.querySelector("#headerUser");
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
    chats = conversacion?.conversaciones || [];
    console.log(chats);
    const contactos= await getContacts();
    mostrarChat(chatsContainer, chats, idUserLogged);
    printHeaderUser(headerUserContainer, contactos, idContacto);
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
      const mesagges = conversacion?.conversaciones || [];
      console.log(message);
      if (idConversacion) {
        const response = await sendMessage({
          idConversation: idConversacion,
          messagesArrays: mesagges,
          sender: senderUser,
          newMenssage: inputElement.value,
        });   
       
      } else {
        const response = await startAConversation({ senderUser: senderUser, receptorUser: idContacto, message: inputElement.value });
        conversacion = response.data;
        idConversacion = conversacion.id;        
      }
      conversacion = await getConversationById(idConversacion);
      chats = conversacion.conversaciones;
      mostrarChat(chatsContainer, chats, idUserLogged);      
      inputElement.value = "";
    }
  }
});

// Actualizar foto del usuario
const modal = document.getElementById('modal');
const btnOpenModal = document.querySelector('.header__dp');
const btnSubmit = document.getElementById('btnSubmit');
const modalInput = document.getElementById('modalInput');
const closeModal = document.getElementsByClassName('close')[0];

// Función para abrir el modal
btnOpenModal.onclick = function() {
  modal.style.display = "block";
}

closeModal.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

btnSubmit.onclick = async function() {  
  const nuevoURLImagen = modalInput.value;  

  if (!idUserLogged) {
    console.log("No se ha detectado un usuario conectado.");
    return;
  }
  
  try {
    
    const usuarioActual = await getATransaction(idUserLogged);    
    
    if (!usuarioActual) {
      console.log("No se encontró el usuario actualmente conectado.");
      return;
    }    
    
    usuarioActual.imagen = nuevoURLImagen;    
    
    await guardarCambiosContacto(usuarioActual);
    
    console.log("Cambios guardados exitosamente");
  } catch (error) {
    console.log("Error al guardar cambios:", error);
  }  
  
  modal.style.display = "none";
}