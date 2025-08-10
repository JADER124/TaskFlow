import { api } from "./global/environments";

// Prefijo común para este grupo de endpoints
const URL = "/requests/api";

// Listar todas las solicitudes
export const getRequests = async () => {
  try {
    const { data } = await api.get(`${URL}/getallsolicitudes/`);
    return data;
  } catch (error) {
    console.error(
      "Error al traer datos del registro:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Detalle de una solicitud por ID
export const getDetailRequest = async (id) => {
  try {
    const { data } = await api.get(`${URL}/getsolicitud/${id}/`);
    return data;
  } catch (error) {
    console.error(
      "Error al traer datos del registro:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Listar usuarios técnicos
export const getAllUsers = async () => {
  try {
    const { data } = await api.get(`${URL}/usuarios/tecnicos/`);
    return data;
  } catch (error) {
    console.error(
      "Error al traer datos del registro:",
      error.response?.data || error.message
    );
    throw error;
  }
};
