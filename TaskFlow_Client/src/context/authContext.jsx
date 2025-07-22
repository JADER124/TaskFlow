import { useState } from "react";
import { createContext, useContext } from "react";

// Crear el context
const UserAuthContext = createContext();

export const ApiProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);


  const loginFromComponent = (userData) => {
    setUser({ username: userData.username, groups: userData.groups });
    setIsAuth(true);
  };

  return (
    <UserAuthContext.Provider value={{ user, isAuth , loginFromComponent}}>
      {children}
    </UserAuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(UserAuthContext);
