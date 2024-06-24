import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import http from '../api/http';
import TournamentsContext from '../context/TournamentsContext';

const Login = () => {
  const { setIsAuthenticated } = useContext(TournamentsContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post('/login', {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setIsAuthenticated(true);
      navigate('/tournaments'); 
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Вход
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Эл.Почта"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Пароль"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Вход
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
