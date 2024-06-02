import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
  return (
    <div>
      <h1>Edit Profile</h1>
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
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" />
            </div>

            <div>
              <label htmlFor="age">Age</label>
              <Field type="number" name="age" />
              <ErrorMessage name="age" component="div" />
            </div>

            <div>
              <label htmlFor="weight">Weight</label>
              <Field type="number" name="weight" />
              <ErrorMessage name="weight" component="div" />
            </div>

            <div>
              <label htmlFor="gender">Gender</label>
              <Field as="select" name="gender">
                <option value="">Select</option>
                <option value="true">Male</option>
                <option value="false">Female</option>
              </Field>
              <ErrorMessage name="gender" component="div" />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <Field type="text" name="phone" />
              <ErrorMessage name="phone" component="div" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="userPicture">User Picture URL</label>
              <Field type="text" name="userPicture" />
              <ErrorMessage name="userPicture" component="div" />
            </div>

            <div>
              <label htmlFor="address.country">Country</label>
              <Field type="text" name="address.country" />
              <ErrorMessage name="address.country" component="div" />
            </div>

            <div>
              <label htmlFor="address.city">City</label>
              <Field type="text" name="address.city" />
              <ErrorMessage name="address.city" component="div" />
            </div>

            <div>
              <label htmlFor="address.street">Street</label>
              <Field type="text" name="address.street" />
              <ErrorMessage name="address.street" component="div" />
            </div>

            <div>
              <label htmlFor="address.postalCode">Postal Code</label>
              <Field type="text" name="address.postalCode" />
              <ErrorMessage name="address.postalCode" component="div" />
            </div>

            <div>
              <label htmlFor="address.houseNr">House Number</label>
              <Field type="text" name="address.houseNr" />
              <ErrorMessage name="address.houseNr" component="div" />
            </div>

            <div>
              <label htmlFor="address.appartmentNr">Apartment Number</label>
              <Field type="text" name="address.appartmentNr" />
              <ErrorMessage name="address.appartmentNr" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfile;
