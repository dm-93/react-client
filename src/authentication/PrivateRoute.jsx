import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import TournamentsContext from '../context/TournamentsContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(TournamentsContext)
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
