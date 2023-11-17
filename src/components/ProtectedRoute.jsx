import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/ROUTES";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (token == null) return <Navigate to={ROUTES.LOGIN} />;
  return children;
};
