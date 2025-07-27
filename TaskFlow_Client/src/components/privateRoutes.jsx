import React from 'react';
import { useAuth } from "../context/authContext"; // Importa el contexto de autenticación
import { Navigate, Outlet } from "react-router-dom"; // Componente para redirigir a otra ruta
import Loader from "./loader"

// Componente que protege las rutas privadas de la aplicación
// Solo permite el acceso si el usuario está autenticado
const privateRoutes = ({ children }) => {
  // Extrae del contexto si el usuario está autenticado y si aún se está verificando
  const { isAuth, loading } = useAuth();

  // Mientras se verifica la sesión (ej. al recargar), muestra un mensaje o loader
  if (loading) return <Loader/>;

  // Si el usuario no está autenticado, redirige al login ("/")
  if (!isAuth) return <Navigate to="/" />;

  // Si está autenticado, permite el acceso al contenido de la ruta protegida
  return <Outlet />;
};

export default privateRoutes;
