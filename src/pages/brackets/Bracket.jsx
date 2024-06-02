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
} from '@mui/material';
import http from '../../api/http';
import TournamentsContext from '../../context/TournamentsContext';

const Bracket = () => {
  const { tournamentId } = useContext(TournamentsContext);
  const [matchups, setMatchups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMatchup, setEditingMatchup] = useState(null);
  const [pendingChanges, setPendingChanges] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [roundName, setRoundName] = useState('');
  const [isFinal, setIsFinal] = useState(false);

  const fetchData = async (round = 1) => {
    setLoading(true);
    try {
      const response = await http.post(`/api/Matchups/Get`, {
        Page: 1,
        ItemsPerPage: 10,
        Parameter: { tournamentId, roundId: round }
      });
      const matchupsData = response.data.data;
      setMatchups(matchupsData);
      setIsEmpty(matchupsData.length === 0);
      if (matchupsData.length === 1) {
        setRoundName('Финал');
        setIsFinal(true);
      } else {
        setRoundName(`Раунд: ${round}`);
        setIsFinal(false);
      }
    } catch (error) {
      console.error('Error fetching matchups', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentRound);
  }, [tournamentId, currentRound]);

  const handleScoreChange = (matchupId, entryId, newScore) => {
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

  const handleWinnerChange = (matchupId, newWinnerId) => {
    console.log(newWinnerId);
    setPendingChanges((prev) => ({
      ...prev,
      [matchupId]: {
        ...prev[matchupId],
        winner: newWinnerId,
      },
    }));
  };

  const saveChanges = async (matchupId) => {
    try {
      const changes = pendingChanges[matchupId];
      console.log(changes);
      const matchupToSave = matchups.find((matchup) => matchup.id === matchupId);
      const payload = {
        ...matchupToSave,
        winner: changes.winner || matchupToSave.winner,
        entries: matchupToSave.entries.map((entry) => ({
          ...entry,
          score: changes.entries?.[entry.id] !== undefined ? changes.entries[entry.id] : entry.score,
        })),
      };
      await http.put(`/api/Matchups`, payload);
      setPendingChanges((prev) => {
        const { [matchupId]: _, ...rest } = prev;
        return rest;
      });
      setEditingMatchup(null);
      fetchData(currentRound); 
    } catch (error) {
      console.error('Error saving changes', error);
    }
  };

  const createBracket = async () => {
    try {
      await http.post(`/api/Matchups?tournamentId=${tournamentId}`);
      fetchData(currentRound);
      setIsEmpty(false);
    } catch (error) {
      console.error("Error creating bracket", error);
    }
  };

  const allWinnersSelected = () => {
    return matchups.every(matchup => matchup.winner);
  };

  const goToNextRound = async () => {
    try {
      const response = await http.post(`/api/Matchups/nextRound`, {
        tournamentId,
        roundId: currentRound
      });
      if (response.data) {
        setCurrentRound(currentRound + 1);
        fetchData(currentRound + 1);
      }
    } catch (error) {
      console.error('Error going to next round', error);
    }
  };

  const finishTournament = async () => {
    try {
      await http.patch(`/api/Tournament/${tournamentId}/complete`);
      alert('Турнир завершен!');
    } catch (error) {
      console.error('Error finishing tournament', error);
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
      <Typography variant="h4">{roundName}</Typography>
      {matchups.map((matchup) => (
        <Paper key={matchup.id} elevation={3} sx={{ mb: 2, p: 2 }}>
          {editingMatchup === matchup.id ? (
            <>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Победитель</InputLabel>
                <Select
                  value={pendingChanges[matchup.id]?.winner || matchup.winner?.id || ''}
                  onChange={(e) => handleWinnerChange(matchup.id, e.target.value)}
                >
                  {matchup.entries.map((entry) => (
                    <MenuItem key={entry.id} value={entry.teamCompeting?.id}>
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
                        <TextField
                          type="number"
                          value={pendingChanges[matchup.id]?.entries?.[entry.id] !== undefined ? pendingChanges[matchup.id].entries[entry.id] : entry.score}
                          onChange={(e) => handleScoreChange(matchup.id, entry.id, parseFloat(e.target.value))}
                        />
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                onClick={() => saveChanges(matchup.id)}
              >
                Сохранить
              </Button>
            </>
          ) : (
            <>
              <List>
                {matchup.entries.map((entry) => (
                  <ListItem key={entry.id}>
                    <ListItemText
                      primary={entry.teamCompeting?.name}
                      secondary={`Score: ${entry.score}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="body1">Победитель: {matchup.winner?.name || 'Не выбран'}</Typography>
              <Button onClick={() => setEditingMatchup(matchup.id)}>Редактировать</Button>
            </>
          )}
        </Paper>
      ))}
      {isFinal ? (
        <Button
          variant="contained"
          color="primary"
          onClick={finishTournament}
          disabled={!allWinnersSelected()}
        >
          Завершить Соревнование
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={goToNextRound}
          disabled={!allWinnersSelected()}
        >
          Следующий этап
        </Button>
      )}
    </Container>
  );
};

export default Bracket;
