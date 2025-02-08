import React, { useEffect, useState } from "react";
import { loginUser } from "../API/user_API";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setDisable(true);
    const userData = await loginUser(username, password);

    if (userData) {
      alert(
        `¡Bienvenido, ${
          userData.username
        }! Perteneces a los grupos: ${userData.groups.join(", ")}`
      );
      setDisable(false);
    } else {
      alert("Error al iniciar sesión");
      setDisable(false);
    }
  };

  return (
    <div class="bg-gray-100">
      <div class="min-h-screen flex items-center justify-center">
        <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div class="flex justify-center mb-8">
            <img
              src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png"
              alt="Logo"
              class="w-30 h-20"
            />
          </div>
          <h1 class="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
            Iniciar sesión
          </h1>
          <form onSubmit={handleLogin}>
            <div class="mb-6">
              <label for="email" class="block mb-2 text-sm text-gray-600">
                Correo electrónico
              </label>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div class="mb-6">
              <label for="password" class="block mb-2 text-sm text-gray-600">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <a href="#" class="block text-right text-xs text-cyan-600 mt-2">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              disabled={disable}
              type="submit"
              class="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
            >
              {disable ? "Validando..." : "Acceso"}
            </button>
          </form>
          <p class="text-xs text-gray-600 text-center mt-10">
            &copy; 2025 TFW LAT
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
