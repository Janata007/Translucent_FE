import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/ROUTES";
import { useSessionStorage } from "./useSessionStorage.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useSessionStorage("token", null);
  const [loggedInUserInfo, setLoggedInUserInfo] = useSessionStorage("loggedInUserInfo", null);

  const login = async (data) => {
    setToken(data);
    navigate(ROUTES.HOME, { replase: true });
  };

 const assignUserInfo = (data) =>{
  setLoggedInUserInfo(data);
 }
  const logout = () => {
    setToken(null);
    navigate(ROUTES.LOGIN, { replace: true });
  };
  const value = useMemo(
    () => ({
      loggedInUserInfo,
      token,
      login,
      logout,
      assignUserInfo,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
