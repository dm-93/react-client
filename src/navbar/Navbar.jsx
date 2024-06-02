import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Header from "../header/Header";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import TournamentsContext from "../context/TournamentsContext";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    height: `calc(100vh - 64px)`,
    overflow: 'auto',
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Navbar({ children, settings }) {
  const theme = useTheme();
  const location = useLocation();
  const { tournamentId, isDrawerOpen, setIsDrawerOpen } = useContext(TournamentsContext);
  const menuItems = [
    {
      text: "Этапы соревнования",
      icon: <EmojiEventsIcon />,
      path: `/bracket`,
    },
    { text: "Игроки", icon: <PersonIcon />, path: `/players` },
    { text: "Команды", icon: <GroupsIcon />, path: `/teams` },
    {
      text: "Настройка соревнования",
      icon: <SettingsIcon />,
      path: `/tournament/${tournamentId}`,
    },
  ];

  const handleDrawerOpen = () => {
    if (tournamentId !== null) {
      setIsDrawerOpen(true);
    } else {
      alert("Пожалуйста, выберите соревнование.");
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        open={isDrawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        settings={settings}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem 
              key={item.text} 
              disablePadding 
              selected={location.pathname === item.path}
            >
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={isDrawerOpen}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
