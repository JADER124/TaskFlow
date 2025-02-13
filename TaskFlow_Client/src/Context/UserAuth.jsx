import React from "react";
import axios from "axios";
import { createContext, useContext } from "react";
const UserAuthContext = createContext();
export const ApiProvider = ({ children }) => {
  const loginUser = async (username, password) => {
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
      localStorage.setItem("groups", response.data.groups);

      return response.data; // Devuelve los datos, incluyendo grupos
    } catch (error) {
      console.error("Error en la autenticación", error);
      return null;
    }
  };
  return (
    <UserAuthContext.Provider value={{ loginUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useApi = () => useContext(UserAuthContext);
