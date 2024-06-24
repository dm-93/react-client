import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { routes } from "./api/navigation";
import Navbar from "./navbar/Navbar";
import PrivateRoute from "./authentication/PrivateRoute";
import Registration from "./authentication/Registration";
import Login from "./authentication/Login";
import AuthSelection from "./authentication/AuthSelection";
import TournamentsContext from "./context/TournamentsContext";

function App() {
  const { isAuthenticated } = useContext(TournamentsContext);

  const authenticatedRoutes = (
    <Routes>
      {routes.map((route) => {
        return route.isPrivate ? (
          <Route
            key={route.name}
            path={route.path}
            element={<PrivateRoute element={route.element} />}
          />
        ) : (
          <Route key={route.name} path={route.path} element={route.element} />
        );
      })}
      <Route path="*" element={<Navigate to="/tournaments" />} />
    </Routes>
  );

  const unauthenticatedRoutes = (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AuthSelection />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  return (
    <Router>
      { isAuthenticated ? (
        <Navbar>{authenticatedRoutes}</Navbar>
      ) : (
        unauthenticatedRoutes
      )}
    </Router>
  );
}

export default App;
