import { api } from "./global/environments";

// Prefijo común para endpoints de clientes
const URL = "/client/api";

// Guardar un nuevo cliente
export const saveClient = async (data) => {
  try {
    const { data: resp } = await api.post(`${URL}/set/`, data);
    return resp;
  } catch (error) {
    console.error(
      "Error al guardar cliente:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Crear solicitud desde cliente
export const clientRequest = async (data) => {
  try {
    const { data: resp } = await api.post(`${URL}/set/createrequest`, data);
    return resp;
  } catch (error) {
    console.error(
      "Error al crear solicitud:",
      error.response?.data || error.message
    );
    throw error;
  }
};
