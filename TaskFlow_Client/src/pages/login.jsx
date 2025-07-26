import React, { useEffect, useState } from "react";
import { loginUser,setCookie,verifyCookie } from "../API/authApi";
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const { loginFromComponent,setShouldVerify ,triggerVerify} = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setDisable(true);

    try {
      const userData = await loginUser(username, password);

      if (userData) {
        setDisable(false);
        loginFromComponent(userData);

        const secureCookie = await setCookie(userData.access, userData.refresh)
        console.log(secureCookie)
        triggerVerify();
        //const prueba = await verifyCookie()
        //console.log("prueba"+prueba)
        //console.log(secureCookie)
        
        if (userData.groups.includes(1) && secureCookie?.status === 200) {
          navigate("/admin");
        } else {
          navigate("/"); // Ruta por defecto si no pertenece a ningún grupo específico
        }
      } else {
        alert("Error al iniciar sesión");
        setDisable(false);
      }
    } catch (error) {
      setDisable(false);
      setUsername('');
      setPassword('');
    }
  };

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
