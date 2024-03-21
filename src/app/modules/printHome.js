import { getContacts } from "../services/userServices";

export const mostrarChat = (container, chatsList, idUserLogged) => {
  container.innerHTML = "";
  chatsList.forEach((element) => {
    const remitente = element.sendBy == idUserLogged ? "my-sms" : "friend-sms";
    const smsBox = document.createElement("div");
    smsBox.classList.add("chat-container__sms-box", `chat-container__${remitente}`);

    smsBox.innerHTML = `
          <p>${element.mensaje}<br /><span>${element.hora}</span></p>
        `;

    container.appendChild(smsBox);
  });
};

export const printHeaderUser = (container, userHeader, idUserLogged) => {
  container.innerHTML = "";

  const usuario = userHeader.find((user) => user.id === idUserLogged);

  if (usuario) {
    container.innerHTML = `
      <div class="img-text">
        <figure class="header__user-img">
          <img
            class="header__dp"
            src="${usuario.imagen}"
            alt="imagen perfil"
          />
        </figure>
        <h4>${usuario.nombre}<br /><span>${usuario.enLinea ? "Online" : "Offline"}</span></h4>
      </div>
      <div class="header__nav-icons">
        <li><i class="fa-solid fa-magnifying-glass"></i></li>
        <li><i class="fa-solid fa-ellipsis-vertical"></i></li>
      </div>
    `;
  }
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
