import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Tournaments } from "./pages/tournaments/Tournaments";
import { TournamentsProvider } from "./context/TournamentsContext";
import { nav } from "./api/navigation";
import Navbar from "./navbar/Navbar";
import Registration from "./authentication/Registration";
import Login from "./authentication/Login";
import AuthSelection from "./authentication/AuthSelection";

const pages = [
  { name: "Соревнования", path: "/tournaments", component: Tournaments },
];
const settings = ["Профиль", "Акаунт", "Статистика", "Выйти"];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <TournamentsProvider>
        <Navbar pages={pages} settings={settings}>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
                <Route path="/" element={<AuthSelection />} />
              </>
            ) : (
              <>
                {nav.map((page) => (
                  <Route
                    key={page.name}
                    path={page.path}
                    element={page.element}
                  />
                ))}
              </>
            )}
          </Routes>
        </Navbar>
      </TournamentsProvider>
    </Router>
  );
}

export default App;
