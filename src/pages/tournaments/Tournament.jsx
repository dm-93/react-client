import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  Paper,
} from "@mui/material";
import http from "../../api/http";
import TournamentsContext from "../../context/TournamentsContext";

const Tournament = () => {
  const { setTournamentId } = useContext(TournamentsContext);
  const [tournament, setTournament] = useState({});
  const [statistics, setStatistics] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 300,
    height: 300,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTournamentInfo = async () => {
      try {
        const response = await http.get(
          `/api/tournament/filter?PropertyName=id&PropertyValue=${id}&PropertyValueType=Tournament`
        );

        if (response.status === 200) {
          const tournamentData = response.data[0];
          setTournamentId(tournamentData.id);
          setTournament(tournamentData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTournamentInfo();
  }, [id, setTournamentId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setTournament((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = new Image();
      image.onload = () => {
        setImageDimensions({ width: image.width, height: image.height });
        setTournament((prev) => ({
          ...prev,
          TournamentPictureBase64: reader.result,
        }));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.put("/api/tournament", tournament, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Tournament updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await http.delete(`/api/tournament?tournamentId=${id}`);
      if (response.status === 204) {
        alert("Tournament deleted successfully");
        navigate("/tournaments");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenStatistics = async () => {
    try {
      const response = await http.get(`/api/tournament/statistics?tournamentId=${id}`);
      if (response.status === 200) {
        setStatistics(response.data);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="lg">
      {tournament.completed && (
        <Typography variant="h6" color="error" gutterBottom>
          Соревнование завершено
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          label="Название"
          name="name"
          value={tournament.name || ""}
          onChange={handleChange}
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" marginY="normal">
          <TextField
            label="Дата начала соревнований"
            type="datetime-local"
            name="startDate"
            value={tournament.startDate || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Дата окончания соревнований"
            type="datetime-local"
            name="endDate"
            value={tournament.endDate || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px dashed gray"
          padding="16px"
          marginY="normal"
          width={imageDimensions.width}
          height={imageDimensions.height}
          style={{
            backgroundImage: tournament.tournamentPictureBase64
              ? `url(${tournament.tournamentPictureBase64})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Button variant="contained" component="label">
            Загрузить картинку
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>
        <Box display="flex" justifyContent="space-between" marginY="normal">
          <Button variant="contained" color="success" type="submit">
            Сохранить
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Удалить
          </Button>
          <Button variant="contained" color="primary" onClick={handleOpenStatistics}>
            Статистика соревнования
          </Button>
        </Box>
      </form>

      <Modal open={open} onClose={handleClose}>
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "16px",
            width: "80%",
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Статистика соревнования
          </Typography>
          {statistics && (
            <Box>
              <Typography variant="body1">
                <strong>Дата начала:</strong> {new Date(statistics.start).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Дата окончания:</strong> {new Date(statistics.end).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Количество раундов:</strong> {statistics.countOfRounds}
              </Typography>
              <Typography variant="body1">
                <strong>Количество матчей:</strong> {statistics.countOfMatches}
              </Typography>
              <Typography variant="body1">
                <strong>Победитель:</strong> {statistics.winner.name}
              </Typography>
              <Typography variant="body1">
                <strong>Средние баллы команд:</strong>
              </Typography>
              <ul>
                {Object.entries(statistics.teamAverageScoreStatistic).map(([team, score]) => (
                  <li key={team}>
                    {team}: {score.toFixed(2)}
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Paper>
      </Modal>
    </Container>
  );
};

export default Tournament;
