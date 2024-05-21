import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Tournaments } from "./pages/tournaments/Tournaments";
import Navbar from "./navbar/Navbar";
import Teams from "./pages/teams/Teams";
import Tournament from "./pages/tournaments/Tournament";
import { TournamentsProvider } from "./context/TournamentsContext";

const pages = [
  { name: "Соревнования", path: "/tournaments", component: Tournaments },
];
const settings = ["Профиль", "Акаунт", "Статистика", "Выйти"];

function App() {
  return (
    <>
      <Router>
        <TournamentsProvider>
          <Navbar pages={pages} settings={settings}>
            <Routes>
              {pages.map((page) => (
                <Route
                  key={page.name}
                  path={page.path}
                  element={<page.component />}
                />
              ))}
              <Route exact path="/" element={<Tournaments />} />
              <Route path="/tournament/:id" element={<Tournament />} />
              <Route path="/teams" element={<Teams />} />
            </Routes>
          </Navbar>
        </TournamentsProvider>
      </Router>
    </>
  );
}

export default App;
