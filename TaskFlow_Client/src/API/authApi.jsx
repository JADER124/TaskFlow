// src/api/userAPI.js

import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/auth/api";

// instancia de axios para crear una base y evitar repetir la ruta
const api = axios.create({
  baseURL: BASE_URL,
  //withCredentials: true,
});

// autenticacion
export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/token/", {
      username,
      password,
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw error;
  }
};