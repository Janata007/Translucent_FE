import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/ROUTES";
import { useSessionStorage } from "./useSessionStorage.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const navigate = useNavigate();
  const [token, setToken] = useSessionStorage("token", null);
  const [userInformation, setUserInformation] = useState({})
  const [loggedInUserInfo, setLoggedInUserInfo] = useSessionStorage("loggedInUserInfo", {
    "userId": 0,
    "firstName": "test",
    "lastName": "user",
    "email": "test@mail.com",
    "sectorId": 14,
    "companyId": 0,
    "password": "]",
    "role": "ADMINISTRATOR",
    "workVisible": false,
    "superiorId": 65,
    "arrangements": [],
    "accountNonExpired": true,
    "accountNonLocked": true,
    "credentialsNonExpired": true,
    "enabled": true,
    "authority": null,
    "username": "test",
    "authorities": [
        {
            "authority": null
        }
    ]
});

  const login = async (data) => {
    setToken(data);
    navigate(ROUTES.HOME, { replase: true });
  };

 const assignUserInfo = (data) =>{
  console.log("assignUserInfo in useAuth: " + data.id);
  setUserInformation(data);
  // setLoggedInUserInfo(data);
 }
  const logout = () => {
    setToken(null);
    setLoggedInUserInfo({});
    navigate(ROUTES.LOGIN, { replace: true });
  };
  const value = useMemo(
    () => ({
      userInformation,
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
