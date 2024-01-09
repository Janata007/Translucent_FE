import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants/ROUTES";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./hooks/useAuth";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider basename={`${process.env.PUBLIC_URL}`}>
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
