import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import http from "../../api/http";
import TournamentsContext from "../../context/TournamentsContext";

const Tournament = () => {
  const { setTournamentId } = useContext(TournamentsContext);
  const [tournament, setTournament] = useState({});
  const [imageDimensions, setImageDimensions] = useState({ width: 300, height: 300 });
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

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
      if (response.status === 204) { // Use 204 No Content status for deletion success
        alert("Tournament deleted successfully");
        navigate("/tournaments"); // Navigate back to tournaments list
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            backgroundImage: tournament.tournamentPictureBase64 ? `url(${tournament.tournamentPictureBase64})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
        </Box>
      </form>
    </Container>
  );
};

export default Tournament;
