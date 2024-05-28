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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import TournamentsContext from "../../context/TournamentsContext";
import MemberDialog from "./MemberDialog";
import http from "../../api/http";

const Members = () => {
    const defaultFormData = {
        firstName: '',
        lastName: '',
        age: '',
        weight: '',
        gender: '',
        phone: '',
        email: '',
        address: {
          country: 'Беларусь',
          street: '',
          houseNr: 0,
          appartmentNr: 0,
          city: 'Минск',
          state: '',
          zip: ''
        }
      };
    const { tournamentId } = useContext(TournamentsContext);
    const [teams, setTeams] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [isTeamSelected, setIsTeamSelected] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(defaultFormData);
  

  useEffect(() => {
    http
      .get(
        `/api/teams/filter?PropertyName=tournamentId&PropertyValue=${tournamentId}&PropertyValueType=Team`
      )
      .then((response) => {
        setTeams(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      http
        .get(
          `/api/persons/filter?PropertyName=TeamId&PropertyValue=${selectedTeam}&PropertyValueType=Person`
        )
        .then((response) => {
          setTeamMembers(response.data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedTeam]);

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    setIsTeamSelected(true);
  };

  const handleClickOpen = () => {
    setIsEditing(false);
    setFormData(defaultFormData);
    setOpenModal(true);
  };

  const handleSave = () => {
    formData.teamId = selectedTeam;
    if (isEditing) {
      http.put(`api/persons/${formData.id}`, formData).then(() => {
        setTeamMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === formData.id ? formData : member
          )
        );
        setOpenModal(false);
      })
      .catch((err) => console.error(err));
    } else {
      http.post('api/persons', formData).then((response) => {
        setTeamMembers((prevMembers) => [...prevMembers, response.data]);
        setOpenModal(false);
      })
      .catch((err) => console.error(err));
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const [field, subfield] = name.split('.');
    if (subfield) {
      setFormData((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          [subfield]: value
        }
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleEdit = (member) => {
    setIsEditing(true);
    setFormData(member);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    // Handle delete member
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Typography variant="h2">Участники</Typography>
        <Button variant="contained" onClick={handleClickOpen}>
          Создать Участника
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        marginTop={2}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="team-select-label">Выберите команду</InputLabel>
          <Select
            labelId="team-select-label"
            value={selectedTeam}
            onChange={handleTeamChange}
          >
            {teams.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {isTeamSelected && (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            marginTop: 8,
            position: "relative",
          }}
        >
          <Grid container spacing={3}>
            {teamMembers.length === 0 ? (
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
                  Не удалось найти ни одного участника команды. Создайте нового участника.
                </Typography>
              </Box>
            ) : (
              <Container maxWidth="lg">
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Имя</TableCell>
                        <TableCell>Фамилия</TableCell>
                        <TableCell>Возраст</TableCell>
                        <TableCell>Улица</TableCell>
                        <TableCell>Город</TableCell>
                        <TableCell>Штат/Регион</TableCell>
                        <TableCell>Почтовый индекс</TableCell>
                        <TableCell>Телефон</TableCell>
                        <TableCell>Эл.Почта</TableCell>
                        <TableCell>Действия</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teamMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>{member.firstName}</TableCell>
                          <TableCell>{member.lastName}</TableCell>
                          <TableCell>{member.age}</TableCell>
                          <TableCell>{member.address.street +' ' + member.address.houseNr}</TableCell>
                          <TableCell>{member.address.city}</TableCell>
                          <TableCell>{member.address.state}</TableCell>
                          <TableCell>{member.address.zip}</TableCell>
                          <TableCell>{member.phone}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleEdit(member)}
                            >
                              Изменить
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleDelete(member.id)}
                              style={{ marginLeft: 8 }}
                            >
                              Удалить
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
      )}
      <MemberDialog
        open={openModal}
        handleClose={handleClose}
        handleSave={handleSave}
        handleChange={handleChange}
        isEditing={isEditing}
        formData={formData}
      />
    </Box>
  );
};

export default Members;
