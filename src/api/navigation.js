import { Tournaments } from "../pages/tournaments/Tournaments";
import Tournament from "../pages/tournaments/Tournament";
import Teams from "../pages/teams/Teams";
import Members from "../pages/players/Members";
import Users from "../pages/admin/Users";
import Bracket from "../pages/brackets/Bracket";
import Registration from "../authentication/Registration";
import Login from "../authentication/Login";
import AuthSelection from "../authentication/AuthSelection";
import UserProfile from "../pages/profile/UserProfile";

export const routes = [
  { path: "/register", name: "Регистрация", element: <Registration />, isPrivate: false },
  { path: "/login", name: "Вход", element: <Login />, isPrivate: false },
  { path: "/", name: "AuthSelection", element: <AuthSelection />, isPrivate: false },
  { path: "/tournaments", name: "Соревнования", element: <Tournaments />, isPrivate: true },
  { path: "/tournament/:id", name: "Настройки Соревнования", element: <Tournament />, isPrivate: true },
  { path: "/teams", name: "Команды", element: <Teams />, isPrivate: true },
  { path: "/players", name: "Участники", element: <Members />, isPrivate: true },
  { path: "/users", name: "Пользователи", element: <Users />, isPrivate: true },
  { path: "/bracket", name: "Турнирная таблица", element: <Bracket />, isPrivate: true },
  { path: "/userProfile", name: "Профиль", element: <UserProfile />, isPrivate: true },
];
