// TournamentBracket.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
} from "@mui/material";
import {
  Home,
  Person,
  People,
  CalendarToday,
  Settings,
  SportsEsports,
} from "@mui/icons-material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const drawerWidth = 240;

const Results = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <HourglassEmptyIcon sx={{ fontSize: 100 }} />
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          No matches scheduled yet
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1, textAlign: "center" }}>
          First, add matches by creating stages and stage items. Then, schedule
          them using the button in the top right corner.
        </Typography>
      </Box>
    </Box>
  );
};

export default Results;
