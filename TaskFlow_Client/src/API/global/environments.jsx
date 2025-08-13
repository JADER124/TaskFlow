import axios from "axios";

// --- Config manual/automática ---
const USE_MANUAL = false; // true = forzar MANUAL_BASE_URL
const MANUAL_BASE_URL = "https://taskflow-3wi0.onrender.com";
// const MANUAL_BASE_URL = "http://localhost:8000"; // ← para dev manual

function autoBaseURL() {
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return "http://localhost:8000";
  }
  return "https://taskflow-3wi0.onrender.com";
}

const BASE_URL = USE_MANUAL ? MANUAL_BASE_URL : autoBaseURL();

// --- Config global de Axios ---
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // deja true si usas cookies HttpOnly
});
