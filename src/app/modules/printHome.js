import { getchats, getContacts } from "../services/userServices";

export const mostrarChat = (container, chatsList) => {
  
  container.innerHTML = "";
  chatsList.forEach((element) => {
    const remitente = element.senderUser === 1 ? "my-sms" : "friend-sms";
    element.conversaciones.forEach((mensaje)  => {
      
      const smsBox = document.createElement("div");
      smsBox.classList.add(
        "chat-container__sms-box",
        `chat-container__${remitente}`
      );

      smsBox.innerHTML = `
          <p>${mensaje.mensaje}<br /><span>${mensaje.hora}</span></p>
        `;

        container.appendChild(smsBox);
      
    });
  });
};

export const listarContactos = async (idUserLogged, contactsContainer) => {
  try {
    contactsContainer.innerHTML = "";
    const contactos = await getContacts(idUserLogged);   

    contactos.forEach((contacto) => {
      contactsContainer.innerHTML += `
      <div class="chat-box" data-click=${contacto.id}>
        <figure class="chat-box__img-box" data-click=${contacto.id}>
          <img
            class="chat-box__img-cover"
            src="${contacto.imagen}"
            data-click=${contacto.id}
            alt="User profile picture">
        </figure>
        <div class="chat-box__chat-details" data-click=${contacto.id}>
          <div class="chat-box__text-head" data-click=${contacto.id}>
            <h4 data-click=${contacto.id}>${contacto.nombre}</h4>
            <p class="chat-box__time chat-box__time--unread" data-click=${contacto.id}>${contacto.fechaUltimaS}</p>
          </div>
          <div class="chat-box__text-sms" data-click=${contacto.id}>
            <p data-click=${contacto.id}>hola</p>
            <b data-click=${contacto.id}>1</b>
          </div>
        </div>
      </div>  
      `;
    });
  } catch (error) {
    contactsContainer.innerHTML = "Ocurrió un error";
  }
};
