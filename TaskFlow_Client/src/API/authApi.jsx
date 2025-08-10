import { api } from "./global/environments";

// Prefijo común de autenticación (rutas relativas respecto al BASE_URL global)
const URL = "/auth/api";

// Iniciar sesión (obtener tokens)
export const loginUser = async (username, password) => {
  try {
    const response = await api.post(`${URL}/token/`, { username, password });
    return response.data; // { access, refresh, ... }
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw error;
  }
};

// Enviar tokens al backend para crear cookies HttpOnly
export const setCookie = async (access, refresh) => {
  try {
    const response = await api.post(
      `${URL}/token/setcookie/`,
      { access, refresh },
      {
        // Hereda withCredentials de la instancia global,
        // pero lo dejamos explícito por claridad
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error al fijar cookie:", error.response?.data || error.message);
    throw error;
  }
};

// Verificar si la cookie HttpOnly es válida
export const verifyCookie = async () => {
  try {
    const res = await api.get(`${URL}/token/verifycookie/`, {
      withCredentials: true,
    });
    return res; // o res.data si prefieres solo el payload
  } catch (error) {
    console.error("Error al verificar cookie:", error.response?.data || error.message);
    throw error;
  }
};
