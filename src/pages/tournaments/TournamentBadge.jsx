import React, { useContext } from "react";
import {
  Button,
  Typography,
  Grid,
  CardContent,
  CardActions,
  Card,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TournamentsContext from "../../context/TournamentsContext";

const TournamentBadge = ({ tournament }) => {
  const { selectTournament } = useContext(TournamentsContext);
  const navigate = useNavigate();

  const handleOpenTournament = () => {
    selectTournament(tournament.id);
    navigate(`/tournament/${tournament.id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={tournament.id}>
      <Card sx={{ maxWidth: 345 }} variant="outlined">
        <CardMedia
          sx={{ height: 140 }}
          image={tournament.tournamentPictureBase64 || "none"}
          title="Tournament picture"
        />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {tournament.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Начало соревнований:{" "}
            {new Date(tournament.startDate).toLocaleDateString()}
          </Typography>
          {tournament.completed && (
            <Typography variant="body2" color="error">
              Соревнование завершено
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button onClick={handleOpenTournament} size="small" variant="contained" color="primary" fullWidth>
            Открыть
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TournamentBadge;
