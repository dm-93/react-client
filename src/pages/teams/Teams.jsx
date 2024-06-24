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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import http from "../../api/http";
import TeamDialog from "./TeamDialog";
import TournamentsContext from "../../context/TournamentsContext";

const StatisticsDialog = ({ open, onClose, statistics }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Статистика Команды</DialogTitle>
    <DialogContent>
      {statistics ? (
        <Box>
          <Typography>Средний счет: {statistics.averageScore}</Typography>
          <Typography>Рейтинг: {statistics.rating}</Typography>
          <Typography>Количество матчей: {statistics.matchesPlayed}</Typography>
        </Box>
      ) : (
        <Typography>Загрузка...</Typography>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">Закрыть</Button>
    </DialogActions>
  </Dialog>
);

export const Teams = () => {
  const { tournamentId } = useContext(TournamentsContext);
  const [teams, setTeams] = useState([]);
  const [openModal, setOpen] = useState(false);
  const [openStatsModal, setOpenStatsModal] = useState(false);
  const [teamStatistics, setTeamStatistics] = useState(null);
  const defaultFormObj = {
    teamId: 0,
    tournamentId: tournamentId,
    name: "",
    description: {
      description: "",
      schoolNr: 0,
    },
  };
  const [formData, setFormData] = useState(defaultFormObj);
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false);
    setFormData(defaultFormObj);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const [parent, child] = name.split(".");
    setFormData((prev) => {
      if (parent === "description") {
        return {
          ...prev,
          description: {
            ...prev.description,
            [child]: type === "checkbox" ? checked : value,
          },
        };
      }

      return {
        ...prev,
        [parent]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSave = async () => {
    if (isEditing) {
      handleUpdate();
    } else {
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
    }
  };

  const handleEdit = (team) => {
    setFormData(team);
    setIsEditing(true);
    setOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await http.put(`/api/teams`, formData);
      if (response.status === 200) {
        setTeams((prev) =>
          prev.map((team) => (team.id === formData.teamId ? response.data : team))
        );
        handleClose();
        setFormData(defaultFormObj);
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (teamId) => {
    try {
      const response = await http.delete(`/api/teams?teamId=${teamId}`);
      if (response.status === 200) {
        setTeams((prev) => prev.filter((team) => team.id !== teamId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatsOpen = async (teamId) => {
    try {
      const response = await http.get(`/api/teams/statistics?teamId=${teamId}`);
      if (response.status === 200) {
        setTeamStatistics(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenStatsModal(true);
  };

  const handleStatsClose = () => {
    setOpenStatsModal(false);
    setTeamStatistics(null);
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
                      <TableCell>Дата создания</TableCell>
                      <TableCell>Действия</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teams.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell>{team.name}</TableCell>
                        <TableCell>{team.description.schoolNr}</TableCell>
                        <TableCell>{new Date(team.createdOn).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(team)}
                          >
                            Изменить
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(team.id)}
                            style={{ marginLeft: 8 }}
                          >
                            Удалить
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => handleStatsOpen(team.id)}
                            style={{ marginLeft: 8 }}
                          >
                            Статистика
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          )}
        </Grid>
      </Box>
      <TeamDialog
        handleSave={handleSave}
        handleClose={handleClose}
        handleChange={handleChange}
        isEditing={isEditing}
        open={openModal}
        formData={formData}
      />
      <StatisticsDialog
        open={openStatsModal}
        onClose={handleStatsClose}
        statistics={teamStatistics}
      />
    </Box>
  );
};

export default Teams;
