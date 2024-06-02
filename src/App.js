import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TournamentsProvider } from "./context/TournamentsContext";
import { routes } from "./api/navigation";
import Navbar from "./navbar/Navbar";
import PrivateRoute from "./authentication/PrivateRoute";
import Registration from "./authentication/Registration";
import Login from "./authentication/Login";
import AuthSelection from "./authentication/AuthSelection";

const settings = ["Профиль", "Акаунт", "Статистика", "Выйти"];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const authenticatedRoutes = (
    <Routes>
      {routes.map((route) => {
        return route.isPrivate ? (
          <Route 
            key={route.name} 
            path={route.path} 
            element={<PrivateRoute isAuthenticated={isAuthenticated} element={route.element} />} 
          />
        ) : (
          <Route 
            key={route.name} 
            path={route.path} 
            element={route.element} 
          />
        );
      })}
      {/* Catch-all route to handle unknown routes */}
      <Route path="*" element={<Navigate to="/tournaments" />} />
    </Routes>
  );

  const unauthenticatedRoutes = (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path="/" element={<AuthSelection />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );

  return (
    <Router>
      <TournamentsProvider>
        {isAuthenticated ? (
          <Navbar settings={settings}>
            {authenticatedRoutes}
          </Navbar>
        ) : (
          unauthenticatedRoutes
        )}
      </TournamentsProvider>
    </Router>
  );
}

export default App;
