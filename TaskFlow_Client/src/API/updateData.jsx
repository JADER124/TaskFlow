import { api } from "./global/environments";

// Prefijo común para endpoints de modificaciones
const URL = "/modificaciones/api";

// Asignar técnico a una solicitud
export const assignTechToRequest = async (id_solicitud, id_tecnico) => {
  try {
    const res = await api.patch(
      `${URL}/modificacion/asignar-usuario/${id_solicitud}/`,
      { id_tecnico }
    );
    return res;
  } catch (error) {
    throw error.response?.data || error;
  }
};
