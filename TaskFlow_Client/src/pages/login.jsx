import React from "react";
import { useForm } from "react-hook-form"; // Esto es para manejar formularios más fácil
import { yupResolver } from "@hookform/resolvers/yup"; // Para conectar Yup con React Hook Form
import * as yup from "yup"; // Yup lo usamos para validar datos
import { loginUser, setCookie } from "../API/authApi"; // Funciones que hablan con el backend para hacer login y guardar cookies
import { useAuth } from "../context/authContext"; // Nuestro contexto global que sabe si el usuario está logueado
import { useNavigate } from "react-router-dom"; // Para movernos entre páginas sin recargar
import logo from "../assets/taskFlow.png"; // El logo de la app
import { useAlert, Alert } from "../components/shared/alert"; // Para mostrar mensajes al usuario (errores, éxito, etc.)

// Aquí definimos cómo queremos que se valide el formulario
// Básicamente: usuario y contraseña son obligatorios
const schema = yup.object().shape({
  username: yup.string().required("El correo es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

// Este es nuestro componente de Login
const Login = () => {
  // Con esto podemos lanzar alertas en la pantalla
  const {
    currentAlert,
    hideAlert,
    showError,
    showSuccess,
    showWarning,
    showInfo,
  } = useAlert();

  // Configuramos el formulario
  // `register` sirve para decirle a React Hook Form qué inputs va a controlar
  // `handleSubmit` es la función que se ejecuta al enviar el form
  // `errors` son los errores de validación
  // `reset` para limpiar el formulario
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // Aquí le decimos: "valida usando este esquema de Yup"
  });

  // Sacamos funciones del contexto de autenticación
  const { loginFromComponent, setUser } = useAuth();

  // Esto lo usamos para redirigir a otra ruta
  const navigate = useNavigate();

  // Esta función se ejecuta cuando el usuario le da al botón de "Iniciar sesión"
  const onSubmit = async ({ username, password }) => {
    try {
      // Paso 1: Mandamos usuario y contraseña al backend
      const userData = await loginUser(username, password);

      // Si no nos devuelve datos, las credenciales son malas
      if (!userData) {
        showError("Error", "Credenciales inválidas");
        return;
      }

      // Paso 2: Guardamos en el backend las cookies con los tokens
      const cookieRes = await setCookie(userData.access, userData.refresh);
      if (cookieRes?.status !== 200) {
        showError("Error", "No se pudo establecer la sesión");
        return;
      }

      // Paso 3: Guardamos algo básico en el sessionStorage (solo para UI, no para autorizar)
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", username);

      // Paso 4: Guardamos en el contexto los grupos de este usuario
      setUser({ groups: userData.groups || [] });

      // Paso 5: Le decimos al contexto: "sí, el usuario está logueado"
      loginFromComponent();

      // Paso 6: Según su grupo, lo mandamos a su sección
      const groups = userData.groups || [];
      if (groups.includes("Coordinadores")) {
        navigate("/admin");
      } else if (groups.includes("Tecnicos")) {
        navigate("/tecnico");
      } else {
        navigate("/");
      }
    } catch (error) {
      // Si algo falla, mostramos un error
      showError(
        "Error",
        error?.response?.data?.detail || "No se pudo iniciar sesión"
      );
      // Limpiamos el formulario para que el usuario lo vuelva a llenar
      reset();
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full p-4 sm:p-6 bg-white rounded-lg shadow-lg">
          {/* Logo responsivo */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Logo"
              className="w-full max-w-[250px] sm:max-w-[300px] h-auto my-2 sm:my-3"
            />
          </div>

          {/* Título responsivo */}
          <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-500 mt-6 sm:mt-8 mb-4 sm:mb-6">
            Iniciar sesión
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Campo Usuario */}
            <div className="mb-4 sm:mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-sm text-gray-600"
              >
                Usuario
              </label>
              <input
                type="text"
                id="username"
                placeholder="Ingrese el usuario"
                {...register("username")}
                className="w-full px-3 sm:px-4 py-2 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div className="mb-4 sm:mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-600"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Ingrese la contraseña"
                {...register("password")}
                className="w-full px-3 sm:px-4 py-2 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Botón responsivo */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full sm:w-32 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 sm:py-2 rounded-lg sm:mx-auto sm:block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-4 sm:mb-6 text-sm sm:text-base"
            >
              {isSubmitting ? "Validando..." : "Acceso"}
            </button>
          </form>

          {/* Copyright */}
          <p className="text-xs text-gray-600 text-center mt-6 sm:mt-10">
            &copy; 2025 TASKFLOW TEAM
          </p>
        </div>
        
        {/* Alert responsivo */}
        {currentAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Alert {...currentAlert} onClose={hideAlert} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;