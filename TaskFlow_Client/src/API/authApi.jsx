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
    return response.data;
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw error;
  }
};

export const setCookie = async (access,refresh) => {
    try {
    const response = await api.post(
      "/token/setcookie/",
      {
        access,
        refresh,
      },
      {
        withCredentials: true,
      }
    );
    return response;
    } catch (error) {
      console.log("Errror"+error.response.data)
  }
};

export const verifyCookie = async () => {
  try {
    const res = await api.get(
      "/token/verifycookie/", 
      { 
        withCredentials: true 
      }
    );
    return res
  } catch (error) {
    console.log(error.message)
  }
};