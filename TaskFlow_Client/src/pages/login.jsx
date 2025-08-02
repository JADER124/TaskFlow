import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser, setCookie } from "../API/authApi";
// Contexto global de autenticación
import { useAuth } from "../context/authContext";
// Hook de navegación de React Router
import { useNavigate } from "react-router-dom";
import logo from "../assets/taskFlow.png";

// Esquema de validación con Yup
const schema = yup.object().shape({
  username: yup.string().required("El correo es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

// Componente Login
const Login = () => {
  // Hook de React Hook Form con Yup como validador
  const {
    register, // Asigna campos del formulario
    handleSubmit, // Función para manejar envío del formulario
    formState: { errors, isSubmitting }, // Errores y estado de envío
    reset, // Reinicia el formulario
  } = useForm({
    resolver: yupResolver(schema), // Usa el esquema de Yup
  });

  // Función del contexto de autenticación
  const { loginFromComponent, setGroup } = useAuth();

  // Hook para redireccionar rutas
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async ({ username, password }) => {
    try {
      // Llama al backend para hacer login
      const userData = await loginUser(username, password);

      if (userData) {
        // Marca al usuario como autenticado en el contexto global
        loginFromComponent();

        // (Opcional) Guarda el grupo del usuario en contexto
        // setGroup(userData.groups[0]);

        // Establece cookies HttpOnly con los tokens
        const secureCookie = await setCookie(userData.access, userData.refresh);

        // Si pertenece al grupo correcto y se creó la cookie:
        if (
          userData.groups.includes("Coordinadores") &&
          secureCookie?.status === 200
        ) {
          // Marca la sesión como activa localmente
          sessionStorage.setItem("isLoggedIn", "true");

          // Redirige al panel admin
          navigate("/admin");
        } else {
          // Redirige al home u otra ruta para usuarios normales
          navigate("/");
        }
      } else {
        // Login fallido: muestra alerta
        alert("Error al iniciar sesión");
      }
    } catch (error) {
      // Si ocurre error, limpia el formulario
      reset();
    }
  };


  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Logo"
              className="w-full max-w-[300px] h-auto my-3"
            />
          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
            Iniciar sesión
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-6">
              <label htmlFor="username" className="block mb-2 text-sm text-gray-600">
                Correo electrónico
              </label>
              <input
                type="text"
                id="username"
                placeholder="Usuario"
                {...register("username")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                {...register("password")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
              <a href="#" className="block text-right text-xs text-cyan-600 mt-2">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
            >
              {isSubmitting ? "Validando..." : "Acceso"}
            </button>
          </form>

          <p className="text-xs text-gray-600 text-center mt-10">&copy; 2025 TASTFLOW TEAM</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
