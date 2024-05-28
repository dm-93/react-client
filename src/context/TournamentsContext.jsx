import React, { createContext, useState, useEffect } from "react";
import http from "../api/http";

const TournamentsContext = createContext({});

export const TournamentsProvider = ({children}) => {
  const [tournaments, setTournaments] = useState([]);
  const [tournamentId, setTournamentId] = useState(0);

  return (
    <TournamentsContext.Provider
      value={{
        tournaments,
        tournamentId,
        setTournaments,
        setTournamentId
      }}
    >
      {children}
    </TournamentsContext.Provider>
  );
};

export default TournamentsContext;
