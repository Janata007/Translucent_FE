import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/ROUTES";
import { useSessionStorage } from "./useSessionStorage.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useSessionStorage("token", null);
  const login = async (data) => {
    setToken(data);
    navigate(ROUTES.HOME, { replase: true });
  };
  const logout = () => {
    setToken(null);
    navigate(ROUTES.LOGIN, { replace: true });
  };
  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
