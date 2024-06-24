import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, FormControlLabel, Checkbox, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import http from '../../api/http';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800, 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const gridContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)', 
  gap: '16px',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно'),
  password: Yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязателен'),
  lastName: Yup.string(),
  age: Yup.number().positive('Возраст должен быть положительным числом').integer('Возраст должен быть целым числом'),
  weight: Yup.number().positive('Вес должен быть положительным числом'),
  gender: Yup.boolean(),
  email: Yup.string().email('Некорректный email').required('Email обязателен'),
  address: Yup.object().shape({
    country: Yup.string().required('Страна обязательна'),
    city: Yup.string().required('Город обязателен'),
    street: Yup.string().required('Улица обязательна'),
    postalCode: Yup.string().required('Почтовый индекс обязателен'),
    houseNr: Yup.string().required('Номер дома обязателен'),
    appartmentNr: Yup.string(),
  }),
  teamId: Yup.number().integer('ID команды должен быть целым числом'),
  userPictureBase64: Yup.string(),
});

const AddUserModal = ({ open, handleClose, handleUserAdded }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await http.get(`/api/teams`);
        if (response.status === 200) {
          setTeams(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTeams();
  }, []);

  const initialValues = {
    name: '',
    password: '',
    lastName: '',
    age: '',
    weight: '',
    gender: false,
    phone: '',
    email: '',
    address: {
      country: '',
      city: '',
      street: '',
      postalCode: '',
      houseNr: '',
      appartmentNr: '',
    },
    teamId: '',
    userPictureBase64: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await http.post('/api/admin/addUser', values);
      if (response.status === 200) {
        alert('Пользователь успешно добавлен');
        handleUserAdded((prev) => [...prev, response.data]);
        handleClose();
      } else {
        alert('Не удалось добавить пользователя');
      }
    } catch (error) {
      alert('Ошибка: ' + error.message);
    }
    setSubmitting(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-user-modal"
      aria-describedby="add-user-modal-description"
    >
      <Box sx={style}>
        <Typography id="add-user-modal" variant="h6" component="h2">
          Добавить нового пользователя
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values, handleChange, setFieldValue }) => (
            <Form style={gridContainer}>
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="name"
                label="Имя"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                required
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="password"
                label="Пароль"
                type="password"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                required
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="lastName"
                label="Фамилия"
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="age"
                label="Возраст"
                type="number"
                error={touched.age && !!errors.age}
                helperText={touched.age && errors.age}
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="weight"
                label="Вес"
                type="number"
                error={touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
              />
              <FormControlLabel
                control={
                  <Field
                    as={Checkbox}
                    name="gender"
                    checked={values.gender}
                    onChange={handleChange}
                  />
                }
                label="Пол"
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="phone"
                label="Телефон"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="email"
                label="Email"
                type="email"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                required
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="address.country"
                label="Страна"
                error={touched.address?.country && !!errors.address?.country}
                helperText={touched.address?.country && errors.address?.country}
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="address.city"
                label="Город"
                error={touched.address?.city && !!errors.address?.city}
                helperText={touched.address?.city && errors.address?.city}
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="address.street"
                label="Улица"
                error={touched.address?.street && !!errors.address?.street}
                helperText={touched.address?.street && errors.address?.street}
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="address.postalCode"
                label="Почтовый индекс"
                error={touched.address?.postalCode && !!errors.address?.postalCode}
                helperText={touched.address?.postalCode && errors.address?.postalCode}
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="address.houseNr"
                label="Номер дома"
                error={touched.address?.houseNr && !!errors.address?.houseNr}
                helperText={touched.address?.houseNr && errors.address?.houseNr}
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="address.appartmentNr"
                label="Номер квартиры"
                error={touched.address?.appartmentNr && !!errors.address?.appartmentNr}
                helperText={touched.address?.appartmentNr && errors.address?.appartmentNr}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Команда</InputLabel>
                <Field
                  as={Select}
                  name="teamId"
                  value={values.teamId}
                  onChange={handleChange}
                  label="Команда"
                >
                  {teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <Box display="flex" alignItems="center" justifyContent="center" gridColumn="span 4">
                <Button variant="contained" component="label">
                  Загрузить фото
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFieldValue('userPictureBase64', reader.result);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </Button>
              </Box>
              {values.userPictureBase64 && (
                <Box display="flex" justifyContent="center" gridColumn="span 4">
                  <img
                    src={values.userPictureBase64}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                </Box>
              )}
              <Box gridColumn="span 4">
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                  Добавить пользователя
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
