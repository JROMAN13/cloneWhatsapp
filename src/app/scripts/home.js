import {getMensajes} from "../services/mensajesServices";
let mensajes = [];

const getMessages = async () => {
    await getMensajes().then((data) => {
        mensajes = data;
        console.log(mensajes);
        printMensajes();
    });
};
   
 function printMensajes(mensajes){
    const mensajito = document.getElementById("chats");
    mensajito.innerHTML = "";
    for (let i = 0; i < mensajes.length; i++) {
        mensajito.innerHTML += `
        <div class="chat-box chat-box--active">
        <figure class="chat-box__img-box">
          <img
            class="chat-box__img-cover"
            src="https://lh5.googleusercontent.com/-7ssjf_mDE1Q/AAAAAAAAAAI/AAAAAAAAASo/tioYx2oklWEHoo5nAEyCT-KeLxYqE5PuQCLcDEAE/s100-c-k-no-mo/photo.jpg"
            alt="User profile picture"
          />
        </figure>
        <div class="chat-box__chat-details">
          <div class="chat-box__text-head">
            <h4>Nowfal</h4>
            <p class="chat-box__time chat-box__time--unread">11:49</p>
          </div>
          <div class="chat-box__text-sms">
            <p>“How are you?”</p>
            <b>1</b>
          </div>
        </div>
      </div>
        `;
    }
}
//getMessages(); este sí/
printMensajes(mensajes); //lo tenia vacio