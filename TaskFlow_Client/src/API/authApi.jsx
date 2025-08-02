// src/api/userAPI.js

import axios from "axios";

// URL base de tu API Django para las rutas de autenticación
const BASE_URL = "http://localhost:8000/auth/api";

// Crea una instancia de Axios con una base común, para evitar repetir la URL
const api = axios.create({
  baseURL: BASE_URL,
  // Si necesitas enviar cookies en cada solicitud (como tokens HttpOnly), activa esto:
  // withCredentials: true,
});

// Función para iniciar sesión (obtener tokens)
export const loginUser = async (username, password) => {
  try {
    // Realiza una petición POST al endpoint de login
    const response = await api.post("/token/", {
      username,
      password,
    });

    // Retorna los tokens recibidos (access y refresh)
    return response.data;
  } catch (error) {
    // Si hay error (credenciales inválidas, por ejemplo), lo muestra en consola
    console.error("Error en login:", error.response?.data || error.message);
    throw error; // Vuelve a lanzar el error para manejarlo donde se llame
  }
};

// Función para enviar los tokens al backend y crear cookies HttpOnly
export const setCookie = async (access, refresh) => {
  try {
    // Hace una petición POST al endpoint /setcookie/ enviando access y refresh tokens
    const response = await api.post(
      "/token/setcookie/",
      { access, refresh },
      {
        withCredentials: true, // Importante: permite enviar cookies (usado en Django)
      }
    );

    // Devuelve la respuesta completa (puedes acceder a status, headers, etc.)
    return response;
  } catch (error) {
    // Imprime el error si ocurre durante el proceso
    console.log("Error" + error.response.data);
  }
};

// Función para verificar si la cookie HttpOnly es válida
export const verifyCookie = async () => {
  try {
    // Realiza una petición GET para verificar la sesión usando la cookie
    const res = await api.get("/token/verifycookie/", {
      withCredentials: true, // Esencial para enviar cookies en la solicitud
    });

    // Si el token en cookie es válido, retorna la respuesta
    return res;
  } catch (error) {
    // Imprime el error en consola si la verificación falla
    console.log(error);
  }
};
