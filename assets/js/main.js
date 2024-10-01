const URL_BASE = "http://localhost:3000/apiV1";
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const btnLogin = document.querySelector("#btn_login");

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (username.value === "" || password.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes rellenar todos los ampos",
      footer: '<a href="./registro.html">Si no tienes cuenta, Registrate!</a>',
      customClass: {
        popup: "custom-swal-popup",
      },
    });
    return;
  }
  iniciarSesion(username.value, password.value);
});

const iniciarSesion = async (username, password) => {
  try {
    const { data } = await axios.post(
      `${URL_BASE}/usuario/login`,
      {
        username,
        password,
      }
    );
    localStorage.setItem("token_chat_user", `${data.token}`);
    window.location.replace("./chat.html");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tus credenciales son incorrectas!",
      footer: '<a href="./registro.html">Si no tienes cuenta, Registrate!</a>',
      customClass: {
        popup: "custom-swal-popup",
      },
    });
  }
};
