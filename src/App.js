import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Tournaments } from "./pages/tournaments/Tournaments";
import Navbar from "./navbar/Navbar";
import Teams from "./pages/teams/Teams";
import Other from "./pages/other/Other";

const pages = [
  { name: "Команды", path: "/teams", component: Teams },
  { name: "Соревнования", path: "/tournaments", component: Tournaments },
  { name: "Другое", path: "/other", component: Other },
];
const settings = ["Профиль", "Акаунт", "Статистика", "Выйти"];

function App() {
  return (
    <>
      <Router>
        <Navbar pages={pages} settings={settings}>
          <Routes>
            {pages.map((page) => (
              <Route
                key={page.name}
                path={page.path}
                element={<page.component />}
              />
            ))}
            {/* <Route path="/" element={<Tournaments/>} /> */}
          </Routes>
        </Navbar>
      </Router>
    </>
  );
}

export default App;
