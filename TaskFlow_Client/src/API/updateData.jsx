// Se importa Axios, una librería para hacer solicitudes HTTP
import axios from "axios";

// Se define la URL base del backend donde están expuestos los endpoints relacionados con clientes
const BASE_URL = "http://localhost:8000/modificaciones/api";

// Se crea una instancia de Axios para evitar repetir la base de la URL en cada solicitud
const api = axios.create({
  baseURL: BASE_URL, // Todas las peticiones hechas con 'api' usarán esta URL como base
    withCredentials: true, // Si se requiere enviar cookies (por ejemplo, JWT en cookies), se puede activar esta línea
});

// Asignar técnico a una solicitud
export const assignTechToRequest = async (id_solicitud, id_tecnico) => {
  try {
    const res = await api.patch(`/modificacion/asignar-usuario/${id_solicitud}/`, {
      id_tecnico: id_tecnico
    });
    return res;
  } catch (error) {
    console.error("Error asignando técnico:", error);
    throw error.response?.data || error;
  }
};