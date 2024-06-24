import React, {useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, Box, Typography, Grid, Container } from '@mui/material';
import http from "../../api/http";

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  age: Yup.number().required('Required').min(0, 'Invalid age'),
  weight: Yup.number().required('Required').min(0, 'Invalid weight'),
  gender: Yup.boolean().required('Required'),
  phone: Yup.string().required('Required').matches(/^[0-9]+$/, 'Invalid phone number'),
  email: Yup.string().required('Required').email('Invalid email'),
  userPicture: Yup.string().required('Required'),
  address: Yup.object().shape({
    country: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
    houseNr: Yup.string().required('Required'),
    appartmentNr: Yup.string().required('Required'),
  }),
});

const UserProfile = () => {
    const [loading, setLoading] = useState(true);
    const [initialValues, setInitialValues] = useState({
      firstName: '',
      lastName: '',
      age: '',
      weight: '',
      gender: '',
      phone: '',
      email: '',
      userPicture: '',
      address: {
        country: '',
        city: '',
        street: '',
        postalCode: '',
        houseNr: '',
        appartmentNr: '',
      },
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = http.get(`api/persons/getByEmail?email=test`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setInitialValues({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          age: data.age || '',
          weight: data.weight || '',
          gender: data.gender || '',
          phone: data.phone || '',
          email: data.email || '',
          userPicture: data.userPicture || '',
          address: {
            country: data.address.country || '',
            city: data.address.city || '',
            street: data.address.street || '',
            postalCode: data.address.postalCode || '',
            houseNr: data.address.houseNr || '',
            appartmentNr: data.address.appartmentNr || '',
          },
        });
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography component="h1" variant="h5">
          Изменить информацию пользователя
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            age: '',
            weight: '',
            gender: '',
            phone: '',
            email: '',
            userPicture: '',
            address: {
              country: '',
              city: '',
              street: '',
              postalCode: '',
              houseNr: '',
              appartmentNr: '',
            },
          }}
          validationSchema={ProfileSchema}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {({ isSubmitting, handleChange, handleBlur, values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Имя"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="firstName" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Фамилия"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="lastName" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Возраст"
                    name="age"
                    type="number"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="age" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Вес"
                    name="weight"
                    type="number"
                    value={values.weight}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="weight" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Пол"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="gender" />}
                  >
                    <MenuItem value={true}>Male</MenuItem>
                    <MenuItem value={false}>Female</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Телефон"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="phone" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Е-мейл"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="email" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Загрузите фото"
                    name="userPicture"
                    value={values.userPicture}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="userPicture" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Страна"
                    name="address.country"
                    value={values.address.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="address.country" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Город"
                    name="address.city"
                    value={values.address.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="address.city" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Улица"
                    name="address.street"
                    value={values.address.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="address.street" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Почтовый код"
                    name="address.postalCode"
                    value={values.address.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="address.postalCode" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Номер дома"
                    name="address.houseNr"
                    value={values.address.houseNr}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="address.houseNr" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Номер квартиры"
                    name="address.appartmentNr"
                    value={values.address.appartmentNr}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="address.appartmentNr" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UserProfile;
