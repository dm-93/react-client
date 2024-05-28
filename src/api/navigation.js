import { Tournaments } from "../pages/tournaments/Tournaments";
import Tournament from "../pages/tournaments/Tournament";
import Teams from "../pages/teams/Teams";
import Members from "../pages/players/Members";

export const nav = [
  {
    path: "/tournaments",
    name: "Соревнования",
    element: <Tournaments />,
    isPrivate: true,
  },
  {
    path: "/tournament/:id",
    name: "Настройки Соревнования",
    element: <Tournament />,
    isPrivate: true,
  },
  { path: "/teams", name: "Команды", element: <Teams />, isPrivate: true },
  {
    path: "/players",
    name: "Участники",
    element: <Members />,
    isPrivate: true,
  },
];
