const URL_BASE = "http://localhost:3000/apiV1";
const chatbox = document.querySelector("#chatbox");
const mensaje = document.querySelector("#inputMensaje");
const username = document.querySelector("#username_text");
const btnLogout = document.querySelector("#btn_logout");
const btnEnviar = document.querySelector("#btn_enviar");
const token = localStorage.getItem("token_chat_user");
const socket = io("http://localhost:3000");

if (!token) {
  window.location.replace("./index.html");
}

btnLogout.addEventListener("click", () => {
  localStorage.removeItem("token_chat_user");
  window.location.replace("./index.html");
});

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  if (mensaje.value === "") {
    return;
  }
  enviarMensaje();
});

socket.on("message", () => {
  cargarMensajes();
});

const enviarMensaje = async () => {
  const idBoton = btnEnviar.getAttribute("data-id");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const datos = {
    mensaje: mensaje.value,
    id: idBoton,
  };

  try {
    const { data } = await axios.post(
      `${URL_BASE}/mensaje/nuevo`,
      datos,
      config
    );

    socket.emit("chatMessage", mensaje.value);
    mensaje.value = "";
  } catch (error) {
    console.log(error.response.data.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
      footer: '<a href="./index.html">Vuelve a iniciar sesion!</a>',
      customClass: {
        popup: "custom-swal-popup",
      },
    });
  }
};

const cargarMensajes = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.get(`${URL_BASE}/mensaje/listado`, config);

    // Limpiar el chatbox antes de cargar nuevos mensajes
    chatbox.innerHTML = "";

    // Agregar cada mensaje al chatbox
    data.account.forEach((msg) => {
      const msgElement = document.createElement("div");
      msgElement.setAttribute("class", "d-flex fs-4");
      const username = msg.usuarios_testing.username;
      const fechaFormateada = moment(msg.fecha_hora)
        .tz("America/Santiago")
        .format("YYYY-MM-DD - HH:mm:ss");
      msgElement.innerHTML = `<p class="fw-bold text-capitalize me-2">${username} - ${fechaFormateada}:</p> <p class="text-danger fw-bold">${msg.mensaje}</p>`;
      chatbox.insertBefore(msgElement, chatbox.firstChild);
    });
  } catch (error) {
    console.log(error.response.data.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
      footer: '<a href="./index.html">Vuelve a iniciar sesion!</a>',
      customClass: {
        popup: "custom-swal-popup",
      },
    });
  }
};

const verificarPerfil = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios(`${URL_BASE}/usuario/perfil`, config);

    username.innerHTML += `${data.nombre}`;
    btnEnviar.setAttribute("data-id", `${data.id}`);
  } catch (error) {
    console.log(error.response.data.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
      footer: '<a href="./index.html">Vuelve a iniciar sesion!</a>',
      customClass: {
        popup: "custom-swal-popup",
      },
    });
  }
};
verificarPerfil();
cargarMensajes();
