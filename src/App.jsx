import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants/ROUTES";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./hooks/useAuth";
import Company from "./pages/Company/Company";
import AddSector from "./pages/Sector/AddSectorToCompany";
import CreateSector from "./pages/Sector/CreateSector";
import CreateArrangement from "./pages/Arrangement/CreateArrangement";

const App = () => {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
      <AuthProvider>
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
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.COMPANY + "/*"} element={<Company />} />
          <Route path={ROUTES.ADD_SECTOR_TO_COMPANY} element={<AddSector />} />
          <Route path={ROUTES.CREATE_SECTOR} element={<CreateSector />} />
          <Route
            path={ROUTES.CREATE_ARRANGEMENT}
            element={<CreateArrangement />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
