import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import {verifyCookie} from "../API/authApi"

// Crear el context
const UserAuthContext = createContext();

export const ApiProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shouldVerify, setShouldVerify] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await verifyCookie()
        console.log(res)
        setIsAuth(true);
      } catch (err) {
        setIsAuth(null);
      } finally {
        setLoading(false); // solo aquí decimos que terminó
      }
    };
    
    if (shouldVerify) {
      console.log("ejecuta auth")
      checkAuth();
      setShouldVerify(false);
    }

  }, [shouldVerify]);

  const loginFromComponent = (userData) => {
    setUser({ username: userData.username, groups: userData.groups });
    //setIsAuth(true);
  };

  return (
    <UserAuthContext.Provider value={{ user, isAuth , loginFromComponent, triggerVerify: () => setShouldVerify(true)}}>
      {children}
    </UserAuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(UserAuthContext);
