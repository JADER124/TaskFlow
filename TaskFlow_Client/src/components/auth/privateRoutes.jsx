import React from 'react';
import { useAuth } from "../../context/authContext"; // Importa el contexto de autenticación
import { Navigate, Outlet,useLocation } from "react-router-dom"; // Componente para redirigir a otra ruta
import Loader from "../shared/loader"

// Componente que protege las rutas privadas de la aplicación
// Solo permite el acceso si el usuario está autenticado
const privateRoutes = () => {
  const { isAuth, loading, user } = useAuth();
  const groups = user?.groups || [];
  const location = useLocation(); // Obtiene la ruta actual

  if (loading) return <Loader />;

  // No autenticado -> login
  if (!isAuth) return <Navigate to="/" replace />;

  // Validar acceso según grupo y ruta
  if (groups.includes("Coordinadores") && location.pathname.startsWith("/admin")) {
    return <Outlet />;
  }

  if (groups.includes("Tecnicos") && location.pathname.startsWith("/tecnico")) {
    return <Outlet />;
  }

  // Si el grupo no tiene permiso para esta ruta → redirige
  return <Navigate to="/" replace />;
};

export default privateRoutes;
