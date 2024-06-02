import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from '@mui/material';
import http from '../../api/http';
import TournamentsContext from '../../context/TournamentsContext';

const Bracket = () => {
  const { tournamentId } = useContext(TournamentsContext);
  const [matchups, setMatchups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editingWinner, setEditingWinner] = useState(null);
  const [pendingChanges, setPendingChanges] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await http.get(`/api/Matchups?parameter=${tournamentId}&page=${page}&itemsPerPage=${itemsPerPage}`);
      console.log(response);
      setMatchups(response.data.data);
      setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
      setIsEmpty(response.data.data.length === 0);
    } catch (error) {
      console.error('Error fetching matchups', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [tournamentId, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleScoreChange = (matchupId, entryId, newScore) => {
    setMatchups((prevMatchups) =>
      prevMatchups.map((matchup) =>
        matchup.id === matchupId
          ? {
              ...matchup,
              entries: matchup.entries.map((entry) =>
                entry.id === entryId ? { ...entry, score: newScore } : entry
              ),
            }
          : matchup
      )
    );
    setPendingChanges((prev) => ({
      ...prev,
      [matchupId]: {
        ...prev[matchupId],
        entries: {
          ...prev[matchupId]?.entries,
          [entryId]: newScore,
        },
      },
    }));
  };

  const handleWinnerChange = (matchupId, newWinner) => {
    setMatchups((prevMatchups) =>
      prevMatchups.map((matchup) =>
        matchup.id === matchupId ? { ...matchup, winner: newWinner } : matchup
      )
    );
    setPendingChanges((prev) => ({
      ...prev,
      [matchupId]: {
        ...prev[matchupId],
        winner: newWinner,
      },
    }));
  };

  const saveAllChanges = async () => {
    try {
      await Promise.all(
        Object.entries(pendingChanges).map(([matchupId, changes]) =>
          http.put(`/api/Matchups/${matchupId}`, changes)
        )
      );
      setPendingChanges({});
    } catch (error) {
      console.error('Error saving changes', error);
    }
  };

  const createBracket = async () => {
    try {
      await http.post(`/api/Matchups?tournamentId=${tournamentId}`);
      fetchData(currentPage);
      setIsEmpty(false);
    } catch (error) {
      console.error("Error creating bracket", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isEmpty) {
    return (
      <Container>
        <Typography variant="h6">Создать турнирную таблицу?</Typography>
        <Button variant="contained" color="primary" onClick={createBracket}>
          Создать
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      {matchups.map((matchup) => (
        <Paper key={matchup.id} elevation={3} sx={{ mb: 2, p: 2 }}>
          <Typography variant="h6">Round: {matchup.matchupRound}</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Winner</InputLabel>
            <Select
              value={editingWinner?.id === matchup.id ? editingWinner.winner.id : matchup.winner?.id || ''}
              onChange={(e) =>
                setEditingWinner({
                  id: matchup.id,
                  winner: matchup.entries.find((entry) => entry.teamCompeting?.id === e.target?.value).teamCompeting,
                })
              }
            >
              {matchup.entries.map((entry) => (
                <MenuItem key={entry.teamCompeting?.id} value={entry.teamCompeting?.id}>
                  {entry.teamCompeting?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <List>
            {matchup.entries.map((entry) => (
              <ListItem key={entry.id}>
                <ListItemText
                  primary={entry.teamCompeting?.name}
                  secondary={
                    editingEntry?.id === entry.id ? (
                      <TextField
                        type="number"
                        value={editingEntry.score}
                        onChange={(e) =>
                          setEditingEntry({ ...editingEntry, score: parseFloat(e.target.value) })
                        }
                      />
                    ) : (
                      `Score: ${entry.score}`
                    )
                  }
                />
                {editingEntry?.id === entry.id ? (
                  <Button
                    onClick={() => {
                      handleScoreChange(matchup.id, entry.id, editingEntry.score);
                      setEditingEntry(null);
                    }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => setEditingEntry({ id: entry.id, score: entry.score })}>
                    Edit
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
          {editingWinner?.id === matchup.id && (
            <Button
              onClick={() => {
                handleWinnerChange(matchup.id, editingWinner.winner);
                setEditingWinner(null);
              }}
            >
              Save Winner
            </Button>
          )}
        </Paper>
      ))}
      <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} sx={{ mt: 3 }} />
      <Button variant="contained" color="primary" onClick={saveAllChanges} sx={{ mt: 3 }}>
        Save All Changes
      </Button>
    </Container>
  );
};

export default Bracket;
