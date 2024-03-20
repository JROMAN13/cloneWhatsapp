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

    mostrarChat(chatsContainer, chats, idUserLogged);
  }
});

inputElement.addEventListener("keydown", async function (event) {
  if (event.keyCode === 13) {
    // Verifica si la tecla presionada es 'Enter'
    const message = inputElement.value.trim(); // Obtiene el mensaje y elimina los espacios en blanco al principio y al final

    if (message !== "") {
      // Verifica si el mensaje no está vacío
      // Llama a la función sendMessage para iniciar una conversación
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
      
      inputElement.value = "";
    }
  }
});

// inputElement.addEventListener("keydown", async function (event) {
//   // Verifica si la tecla presionada es 'Enter'
//   if (event.keyCode === 13) {
//     // Detiene el comportamiento predeterminado de la tecla 'Enter' (evita enviar el formulario)
//     event.preventDefault();
//     console.log("Enviado");

//     // Obtiene el valor del mensaje y elimina los espacios en blanco al principio y al final
//     const message = inputElement.value.trim();

//     // Verifica si el mensaje no está vacío
//     if (message !== "") {
//       try {
//         // Llama a la función getConversation para obtener la conversación existente
//         const conversationId = "1"; // ID de la conversación (reemplaza con el valor adecuado)
//         const existingConversation = await getConversation(conversationId); // Implementa esta función
      
//         console.log("Conversación existente:", existingConversation);
      
//         // Verifica si se pudo obtener la conversación existente
//         if (existingConversation && existingConversation.length > 0) {
//           // Obtiene el array de mensajes existentes directamente
//           const messagesArray = existingConversation.map((conversation) => ({ ...conversation }));
      
//           // Agrega el nuevo mensaje al final del array de mensajes
//           const senderUser = 1; // ID del usuario remitente (reemplaza con el valor adecuado)
//           const newMessage = {
//             sendBy: senderUser,
//             fecha: new Date(),
//             hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//             visto: false,
//             mensaje: message,
//           };
//           messagesArray.push(newMessage);
      
//           // Llama a la función sendMessage para enviar el mensaje actualizado
//           await sendMessage({ idConversation: conversationId, messagesArrays: messagesArray, sender: senderUser, newMenssage: message });
      
//           // Limpia el campo de entrada después de enviar el mensaje
//           inputElement.value = "";
//         } else {
//           console.error("La conversación no se pudo encontrar o no tiene mensajes.");
//         }
//       } catch (error) {
//         console.error("Error al enviar el mensaje:", error);
//       }
      
//     }
//   }
// });


// inputElement.addEventListener('keydown', async function(event) {
//   // Verifica si la tecla presionada es 'Enter'
//   if (event.keyCode === 13) {
//     // Detiene el comportamiento predeterminado de la tecla 'Enter' (evita enviar el formulario)
//     event.preventDefault();

//     // Obtiene el valor del mensaje y elimina los espacios en blanco al principio y al final
//     const message = inputElement.value.trim();

//     // Verifica si el mensaje no está vacío
//     if (message !== '') {
//       try {
//         // Llama a la función sendMessage para enviar el mensaje
//         const senderUser = 1; // ID del usuario remitente (reemplaza con el valor adecuado)
//         const idConversation = 1; // ID de la conversación (reemplaza con el valor adecuado)
//         await sendMessage({ idConversation, messagesArrays: [], sender: senderUser, newMenssage: message });

//         // Limpia el campo de entrada después de enviar el mensaje
//         inputElement.value = '';
//       } catch (error) {
//         console.error('Error al enviar el mensaje:', error);
//       }
//     }
//   }
// });

// inputElement.addEventListener('keydown', async function(event) {
//   if (event.keyCode === 13) { // Verifica si la tecla presionada es 'Enter'
//     const message = inputElement.value.trim(); // Obtiene el mensaje y elimina los espacios en blanco al principio y al final

//     if (message !== '') { // Verifica si el mensaje no está vacío
//       // Llama a la función sendMessage para iniciar una conversación
//       const senderUser = 1;
//       const idConversacion = 1;
//       await sendMessage({ idConversation: idConversacion, messagesArrays, sender: senderUser, newMenssage: message });

//       inputElement.value = '';
//     }
//   }

// });
