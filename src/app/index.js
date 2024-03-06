import "./styles/style.scss";
// import image from "./assets/images/logo.svg";
import {
  createTransaction,
  deleteATransaction,
  getTransactions,
} from "./services/transactionServices";
import printTransactions from "./modules/printTransactions";
import { getDataForm, validateDataForm } from "./modules/getDataForm";
import { getUser } from "./services/userServices";
import { endpoints } from "./services/data";
import Swal from "sweetalert2";


//Actualizar las imágenes en el atributo src de las etiquetas
let transactions = [];
const logoImage = document.getElementById("logo");
const transactionsContainer = document.getElementById("transactions");
const form = document.getElementById("form");
const formLogin = document.getElementById("formLogin");
console.log(formLogin);

const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
  item.addEventListener('click', function() {
    switchers.forEach(item => item.parentElement.classList.remove('is-active'))
    this.parentElement.classList.add('is-active')
  })
})

// logoImage.setAttribute("src", image);

//Queremos listar los movimientos o trasacciones
document.addEventListener("DOMContentLoaded", async () => {
  transactions = await getTransactions();
  // printTransactions(transactionsContainer, transactions);
});


/*--------- FUNCION REGISTRAR -------- */

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTransaction = getDataForm(form);
  const validation = validateDataForm(newTransaction);
  console.log(validation);
  if (validation) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El formulario tiene los siguientes datos incorrectos: \n" + validation.toString(),
    });
  } else {
    // const date = new Date().toLocaleDateString("en-US");
    const date = new Date();
    console.log(date);
    newTransaction.fechaUltimaS = date;
    newTransaction.enLinea = false;
    newTransaction.imagen = "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg"
    console.log(newTransaction);
    const responseTransaction = await createTransaction(newTransaction);
    transactions.push(responseTransaction.data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Registro exitoso",
      showConfirmButton: false,
      timer: 1500
    });
    // printTransactions(transactionsContainer, transactions);
    form.reset();
  }
});


/*--------- FUNCION LOGIN -------- */

//------------Declaración de funciones-------------
const login = async (userData) => {
  const url = endpoints.getAnUser(userData.celular, userData.contraseña);
  const userLogged = await getUser(url);
  if (userLogged) {
    Swal.fire({
      icon: "success",
      title: `Bienvenid@ ${userLogged.nombre}`,
      showConfirmButton: false,
      timer: 1500
    });
    form.reset();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Credenciales Incorrectas",
    });
  }
};
//-------------Ejecutar------------

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userData = getDataForm(formLogin);
  login(userData);
});


document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete")) {
    const id = event.target.getAttribute("name");
    await deleteATransaction(id);
    transactions = await getTransactions();
    printTransactions(transactionsContainer, transactions);
  }

  if (event.target.classList.contains("edit")) {
    console.log("Quiero editar");
  }
});
