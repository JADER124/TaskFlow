import React from 'react'
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const privateRoutes = ({ children }) => {
  const { isAuth,loading } = useAuth();

  if (loading) return <div>Cargando sesión...</div>; // Espera...

  if (!isAuth) return <Navigate to="/" />; // No autenticado

  return children; 
}

export default privateRoutes