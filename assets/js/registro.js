const URL_BASE = "http://localhost:3000/apiV1";
const nombre = document.querySelector("#nombre");
const username = document.querySelector("#username");
const correo = document.querySelector("#correo");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const btnRegistro = document.querySelector("#btn_registro");

btnRegistro.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    nombre.value === "" ||
    username.value === "" ||
    correo.value === "" ||
    password.value === "" ||
    password2.value === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes rellenar todos los campos",
      footer: '<a href="./index.html">Si ya tienes cuenta, Inicia Sesión!</a>',
      customClass: {
        popup: "custom-swal-popup",
      },
    });
    return;
  }
  if (password.value !== password2.value) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Las Contraseñas no Coindicen",
      footer: '<a href="./index.html">Si ya tienes cuenta, Inicia Sesión!</a>',
      customClass: {
        popup: "custom-swal-popup",
      },
    });
    return;
  }

  registrarUsuario(
    nombre.value.toLowerCase(),
    username.value.toLowerCase(),
    correo.value.toLowerCase(),
    password.value
  );
});

const registrarUsuario = async (nombre, username, correo, password) => {
  try {
    const { data } = await axios.post(`${URL_BASE}/usuario/registro`, {
      nombre,
      username,
      correo,
      password,
    });
    console.log(data);

    if (data.status === "Success") {
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: "Usuario Creado Exitosamente!",
        footer: '<a href="./index.html">Iniciar Sesión!</a>',
        customClass: {
          popup: "custom-swal-popup",
        },
      });
      window.location.replace("./index.html");
    }
  } catch (error) {
    console.error();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.msg}`,
      footer:
        '<a href="./index.html">Si ya estas registrado, Inicia Sesión!</a>',
      customClass: {
        popup: "custom-swal-popup",
      },
    });
  }
};
