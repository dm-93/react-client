import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthSelection = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Добро пожаловать
        </Typography>
        <Typography variant="h6" gutterBottom>
          Пожалуйста войдите или зарегистрируйтесь
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => navigate("/login")}
          >
            Войти
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/register")}
          >
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthSelection;
