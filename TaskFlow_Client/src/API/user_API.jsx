import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/token/";

export const User_Api = () => {
  return axios.get("http://127.0.0.1:8000/TaskFlow/Api_User/users/");
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/TaskFlow/api/token/",
      {
        username: username,
        password: password,
      }
    );

    console.log("Respuesta del servidor:", response.data);

    // Guardamos el token en localStorage
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    return response.data; // Devuelve los datos, incluyendo grupos
  } catch (error) {
    console.error("Error en la autenticación", error);
    return null;
  }
};
