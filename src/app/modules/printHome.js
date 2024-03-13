import { getchats, getContacts } from "../services/userServices";

/* función listar chats*/

import { getchats, getContacts } from "../services/userServices";

/* función listar chats*/
export async function abrirChat() {
  const dataInfo = await getchats();

  MostrarChat(dataInfo);
}

export function printMensajes(mensajes) {
  console.log(mensajes);
  const message = document.getElementById("chats");

  mensajes[0].conversaciones.forEach((element) => {
    const chatBox = document.createElement("div");
    chatBox.classList.add("chat-box", "chat-box--active");
    chatBox.innerHTML = `
        <figure class="chat-box__img-box">
          <img
            class="chat-box__img-cover"
            src="https://lh5.googleusercontent.com/-7ssjf_mDE1Q/AAAAAAAAAAI/AAAAAAAAASo/tioYx2oklWEHoo5nAEyCT-KeLxYqE5PuQCLcDEAE/s100-c-k-no-mo/photo.jpg"
            alt="User profile picture"
          />
        </figure>
        <div class="chat-box__chat-details">
          <div class="chat-box__text-head">
            <h4>${element.sendBy}</h4>
            <p class="chat-box__time chat-box__time--unread">${element.hora}</p>
          </div>
          <div class="chat-box__text-sms">
            <p>${element.mensaje}</p>
            <b>1</b>
          </div>
        </div>
      `;

    chatBox.addEventListener("click", () => abrirChat());
    message.appendChild(chatBox);
  });
}

export function MostrarChat(dataInfo) {
  const chatContainer = document.querySelector(".chat-container");

  // Limpiar el contenido actual del contenedor
  chatContainer.innerHTML = "";

  // Crear y agregar elementos para cada mensaje
  dataInfo.forEach((conversacion) => {
    const remitente = conversacion.senderUser === 1 ? "my-sms" : "friend-sms";

    conversacion.conversaciones.forEach((mensaje) => {
      const smsBox = document.createElement("div");
      smsBox.classList.add(
        "chat-container__sms-box",
        `chat-container__${remitente}`
      );

      smsBox.innerHTML = `
          <p>${mensaje.mensaje}<br /><span>${mensaje.hora}</span></p>
        `;

      chatContainer.appendChild(smsBox);
    });
  });
}
//funcion listarUsers, hacer petición get

export const listarContactos = async (idUserLogged, contactsContainer) => {
  try {
    contactsContainer.innerHTML = "";
    const contactos = await getContacts(idUserLogged);
    console.log(contactos);

    contactos.forEach((contacto) => {
      contactsContainer.innerHTML += `<div class="chat-box">
      <figure class="chat-box__img-box">
       <img
         class="chat-box__img-cover"
         src="${contacto.imagen}"
         alt="User profile picture"
       />
     </figure>
      <div class="chat-box__chat-details">
       <div class="chat-box__text-head">
         <h4>${contacto.nombre}</h4>
         <p class="chat-box__time chat-box__time--unread">${contacto.fechaUltimaS}</p>
       </div>
       <div class="chat-box__text-sms">
         <p>hola</p>
         <b>1</b>
       </div>
     </div>
   </div>  
      `;
    });
  } catch (error) {
    contactsContainer.innerHTML = "Ocurrió un error";
  }
};
