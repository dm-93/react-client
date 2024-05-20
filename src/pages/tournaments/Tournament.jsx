import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField, Button, Box } from "@mui/material";
import http from "../../api/http";

const Tournament = () => {
  const [tournament, setTournament] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getTournamentInfo = async () => {
      try {
        const response = await http.get(
          `/api/tournament/filter?PropertyName=id&PropertyValue=${id}&PropertyValueType=Tournament`
        );

        if (response.status === 200) {
          setTournament(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTournamentInfo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setTournament((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  return (
    <Container maxWidth="lg">
      <form>
        <TextField
          fullWidth
          required
          label="Название"
          name="name"
          value={tournament.name || ''}
          onChange={handleChange}
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" marginY="normal">
          <TextField
            label="Дата начала соревнований"
            type="datetime-local"
            name="startDate"
            value={tournament.startDate || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Дата окончания соревнований"
            type="datetime-local"
            name="endDate"
            value={tournament.endDate || ''}
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
        >
          <Button variant="contained" component="label">
            Загрузить картинку
            <input type="file" hidden />
          </Button>
        </Box>
        <Box display="flex" justifyContent="space-between" marginY="normal">
          <Button variant="contained" color="success">
            Сохранить
          </Button>
          <Button variant="contained" color="error">
            Удалить
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Tournament;
