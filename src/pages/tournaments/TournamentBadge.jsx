import React from "react";
import {
  Button,
  Typography,
  Grid,
  CardContent,
  CardActions,
  Card,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";

const TournamentBadge = ({ tournament }) => {
  return (
    <Grid item xs={12} sm={6} md={4} key={tournament.id}>
      <Card sx={{ maxWidth: 345 }} variant="outlined">
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Tournament picture"
        />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {tournament.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Начало соревнований:{" "}
            {new Date(tournament.createdOn).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/tournament/${tournament.id}`} size="small" variant="contained" color="primary" fullWidth>
            Открыть
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TournamentBadge;
