import React, { useEffect, useState } from "react";
import { loginUser, setCookie, verifyCookie } from "../API/authApi"; // Funciones que hacen peticiones al backend
import { useAuth } from "../context/authContext"; // Contexto global para manejar autenticación
import { useNavigate } from "react-router-dom"; // Hook para redireccionar programáticamente

const Login = () => {
  // Estados para almacenar las credenciales del usuario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Estado para deshabilitar el botón durante la petición
  const [disable, setDisable] = useState(false);

  // Extrae funciones del contexto de autenticación
  const { loginFromComponent } = useAuth();

  // Hook para redireccionar después del login
  const navigate = useNavigate();

  // Función que maneja el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // Previene recarga del formulario
    setDisable(true); // Desactiva el botón mientras se hace login

    try {
      // Llama al backend para autenticar al usuario
      const userData = await loginUser(username, password);

      if (userData) {
        setDisable(false); // Reactiva el botón

        // Actualiza el contexto de usuario (esto puede incluir nombre y grupos)
        loginFromComponent();

        // Envía los tokens al backend para que los guarde como cookies HttpOnly
        const secureCookie = await setCookie(userData.access, userData.refresh);

        // Si el usuario pertenece al grupo de admin y la cookie fue creada exitosamente
        if (userData.groups.includes(1) && secureCookie?.status === 200) {
          navigate("/admin"); // Redirige a dashboard admin
        } else {
          navigate("/"); // Redirige a ruta por defecto
        }
      } else {
        alert("Error al iniciar sesión");
        setDisable(false); // Reactiva el botón para volver a intentar
      }
    } catch (error) {
      // Manejo de error si ocurre algún fallo al autenticar
      setDisable(false);
      setUsername('');
      setPassword('');
    }
  };

  // JSX que renderiza el formulario de login
  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="Logo"
              className="w-30 h-20"
            />
          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
            Iniciar sesión
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
                Correo electrónico
              </label>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <a href="#" className="block text-right text-xs text-cyan-600 mt-2">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              disabled={disable}
              type="submit"
              className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
            >
              {disable ? "Validando..." : "Acceso"}
            </button>
          </form>
          <p className="text-xs text-gray-600 text-center mt-10">
            &copy; 2025 TFW LAT
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
