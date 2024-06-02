import { Box, Button, Typography, Grid } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import http from "../../api/http";
import CreateTournamentDialog from "./CreateTournamentDialog";
import TournamentBadge from "./TournamentBadge";
import TournamentsContext from "../../context/TournamentsContext";

const defaultForObj = {
  name: "",
  startDate: "",
  endDate: "",
};

export const Tournaments = () => {
  const { tournaments, setTournaments } = useContext(TournamentsContext);
  const [openModal, setOpen] = useState(false);
  const [formData, setFormData] = useState(defaultForObj);

  useEffect(() => {
    const getTournaments = async () => {
      try {
        const response = await http.get("/api/tournament");

        if (response.status === 200) {
          setTournaments(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTournaments();
  }, [setTournaments]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log(formData);
      const response = await http.post("/api/tournament", formData);
      if (response.status === 201) {
        setTournaments((prev) => [...prev, response.data]);
        handleClose();
        setFormData(defaultForObj);
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
        <Typography variant="h2">Соревнования</Typography>
        <Button variant="contained" onClick={handleClickOpen}>
          Создать соревнование
        </Button>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, marginTop: 8 }}
      >
        <Grid container spacing={3}>
          {tournaments.length === 0 ? (
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
                Не удалось найти ни одного соревнования. Создайте новое
                соревнование.
              </Typography>
            </Box>
          ) : (
            tournaments.map((tournament) => (
              <TournamentBadge key={tournament.id} tournament={tournament} />
            ))
          )}
        </Grid>
      </Box>
      <CreateTournamentDialog
        handleSave={handleSave}
        handleClose={handleClose}
        handleChange={handleChange}
        open={openModal}
        formData={formData}
        setFormData={setFormData}
      />
    </Box>
  );
};
