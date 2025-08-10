// Se importa Axios, una librería para hacer solicitudes HTTP
import axios from "axios";

// Se define la URL base del backend donde están expuestos los endpoints relacionados con clientes
const BASE_URL = "http://localhost:8000/client/api";

// Se crea una instancia de Axios para evitar repetir la base de la URL en cada solicitud
const api = axios.create({
  baseURL: BASE_URL, // Todas las peticiones hechas con 'api' usarán esta URL como base
  withCredentials: true, // Si se requiere enviar cookies (por ejemplo, JWT en cookies), se puede activar esta línea
});

// Función que guarda un nuevo cliente enviando los datos al backend
export const saveClient = async (data) => {
  try {
    // Se hace una solicitud POST al endpoint '/set/' con los datos del cliente
    const response = await api.post("/set/", data);

    // Si la respuesta es exitosa, se devuelve solo el cuerpo de la respuesta (response.data)
    return response.data;
  } catch (error) {
    // Si ocurre un error, se muestra un mensaje por consola para depuración.
    // Se intenta acceder al error específico del backend (error.response.data),
    // si no está disponible, se muestra el mensaje general del error
    console.error(
      "Error al traer datos del registro:",
      error.response?.data || error.message
    );

    // Se lanza el error hacia fuera para que quien llame esta función (por ejemplo, onSubmit) lo maneje
    throw error;
  }
};

export const clientRequest = async (data) => {
  try {
    // Se hace una solicitud POST al endpoint '/set/' con los datos del cliente
    const response = await api.post("/set/createrequest", data);

    // Si la respuesta es exitosa, se devuelve solo el cuerpo de la respuesta (response.data)
    return response.data;
  } catch (error) {
    // Si ocurre un error, se muestra un mensaje por consola para depuración.
    // Se intenta acceder al error específico del backend (error.response.data),
    // si no está disponible, se muestra el mensaje general del error
    console.error(
      "Error al traer datos del registro:",
      error.response?.data || error.message
    );

    // Se lanza el error hacia fuera para que quien llame esta función (por ejemplo, onSubmit) lo maneje
    throw error;
  }
};
