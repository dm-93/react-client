import React, { createContext, useState, useEffect } from "react";

const TournamentsContext = createContext();

export const TournamentsProvider = ({ children }) => {
  const [tournamentId, setTournamentId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkAuthentication();
  }, []);

  const selectTournament = (id) => {
    setTournamentId(id);
    setIsDrawerOpen(true);
  };

  return (
    <TournamentsContext.Provider
      value={{
        tournamentId,
        setTournamentId,
        tournaments,
        setTournaments,
        selectTournament,
        isDrawerOpen,
        setIsDrawerOpen,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </TournamentsContext.Provider>
  );
};

export default TournamentsContext;
