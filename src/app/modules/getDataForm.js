import Swal from "sweetalert2";

export const getDataForm = (form) => {
  const dataForm = {};
  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    dataForm[key] = value;
  }

  return dataForm;
};

export const validateDataForm = (dataForm) => {
  let emptyFields = [];
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  const textRegex = /^[a-zA-Z\s]*$/;

  for (const key in dataForm) {
    if (dataForm[key].trim() === "") {
      emptyFields.push(key);
    }
  }

  if (dataForm.celular.length != 10) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El celular debe contener 10 números"
    });
    emptyFields.push("celular"); 
  } 

  if (!passwordRegex.test(dataForm.contraseña)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `La contraseña debe de contener: \n* Minimo 8 caracteres y Maximo 15 \n* Al menos una letra mayúscula \n* Al menos una letra minúscula
      \n Al menos un dígito \n* Sin espacios en blanco \n* Al menos 1 caracter especial`
    });
    emptyFields.push("contraseña");
  }

  if (dataForm.nombre.length == null || dataForm.nombre.length <= 3 || !textRegex.test(dataForm.nombre) ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El nombre debe contener solo letras y más de 3 caracteres"
    });
    emptyFields.push("nombre");
  }

  if (dataForm.description.length == null || dataForm.description.length === 0 || !textRegex.test(dataForm.description) ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La descripcion debe contener solo letras"
    });
    emptyFields.push("descripcion");
  }

  return emptyFields.length > 0 ? emptyFields : false;
};