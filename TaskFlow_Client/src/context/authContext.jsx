import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { verifyCookie } from "../API/authApi"; // Servicio para verificar la validez de la cookie del usuario

// Crear el contexto para la autenticación
const UserAuthContext = createContext();

// Componente proveedor que encapsula la app y gestiona el estado de autenticación
export const ApiProvider = ({ children }) => {
  // Estado para almacenar el usuario (si deseas extenderlo en el futuro)
  const [user, setUser] = useState(null);

  // Estado que indica si el usuario está autenticado
  const [isAuth, setIsAuth] = useState(true);

  // Estado que indica si todavía se está verificando la sesión (útil para mostrar loaders)
  const [loading, setLoading] = useState(true);

  //Estado que almacena el grupo del usuario logueado
  const [group, setGroup] = useState("");

  // Hook que se ejecuta solo una vez al montar el componente
  // Verifica si existe una cookie válida y actualiza el estado de autenticación
  useEffect(() => {
    const checkAuth = async () => {

      // VERIFICACIÓN previa con localStorage
      const loggedInFlag = sessionStorage.getItem("isLoggedIn");
      if (!loggedInFlag) {
        setIsAuth(false);   // No se ha iniciado sesión
        setLoading(false);  // Finaliza sin hacer petición
        return;
      }

      try {
        const res = await verifyCookie();
        console.log(res.data)
        // Si la cookie es válida, establece autenticado
        if (res?.status === 200 && res.data) {
          setIsAuth(true);
          setUser({ groups: res.data.groups || [] })
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false); // Si hubo un error (por ejemplo, cookie expirada)
      } finally {
        setLoading(false); // Ya terminó la verificación
      }
    };

    checkAuth(); // Ejecuta la verificación
  }, []);

  // Función para activar la autenticación desde el login (cuando ya sabes que fue exitosa)
  const loginFromComponent = () => {
    setIsAuth(true);
  };

  // Devuelve el proveedor del contexto con los valores necesarios
  return (
    <UserAuthContext.Provider value={{ user, setUser, isAuth, loading, loginFromComponent, setGroup, group }}>
      {children}
    </UserAuthContext.Provider>
  );
};

// Hook personalizado para consumir fácilmente el contexto desde otros componentes
export const useAuth = () => useContext(UserAuthContext);
