import {
  Box,
  Button,
  Typography,
  Grid,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import http from "../../api/http";
import CreateTeamDialog from "./CreateTeamDialog";
import TournamentsContext from "../../context/TournamentsContext";

export const Teams = () => {
  const { tournamentId } = useContext(TournamentsContext);
  const [teams, setTeams] = useState([]);
  const [openModal, setOpen] = useState(false);
  const defaultFormObj = {
    tournamentId: tournamentId,
    description: {
      name: "",
      schoolNr: 0,
    },
  };
  const [formData, setFormData] = useState(defaultFormObj);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await http.get(
          `/api/teams/filter?PropertyName=tournamentId&PropertyValue=${tournamentId}&PropertyValueType=Team`
        );
        if (response.status === 200) {
          setTeams(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTeams();
  }, [tournamentId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const [parent, child] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await http.post("/api/teams", formData);
      if (response.status === 201) {
        setTeams((prev) => [...prev, response.data]);
        handleClose();
        setFormData(defaultFormObj);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box display="flex" flexWrap="wrap">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Typography variant="h2">Команды</Typography>
        <Button variant="contained" onClick={handleClickOpen}>
          Создать Команду
        </Button>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, marginTop: 8 }}
      >
        <Grid container spacing={3}>
          {teams.length === 0 ? (
            <Box
              textAlign="center"
              sx={{
                backgroundColor: "#ccd9ff",
                border: "1px solid blue",
                borderRadius: "8px",
              }}
              width="100%"
            >
              <Typography variant="h5" gutterBottom>
                Не удалось найти ни одной команды. Создайте новую команду.
              </Typography>
            </Box>
          ) : (
            <Container maxWidth="lg">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Название</TableCell>
                      <TableCell>Номер школы</TableCell>
                      <TableCell>Дата добавления</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teams.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell>{team.description.name}</TableCell>
                        <TableCell>{team.description.schoolNr}</TableCell>
                        <TableCell>{team.createdOn}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          )}
        </Grid>
      </Box>
      <CreateTeamDialog
        handleSave={handleSave}
        handleClose={handleClose}
        handleChange={handleChange}
        open={openModal}
        formData={formData}
      />
    </Box>
  );
};

export default Teams;
