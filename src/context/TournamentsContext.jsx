import React, { createContext, useState } from "react";

const TournamentsContext = createContext();

export const TournamentsProvider = ({ children }) => {
  const [tournamentId, setTournamentId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tournaments, setTournaments] = useState([]);

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
      }}
    >
      {children}
    </TournamentsContext.Provider>
  );
};

export default TournamentsContext;
