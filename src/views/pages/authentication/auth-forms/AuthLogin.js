import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorPopup from './ErrorPopup';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';

const FirebaseLogin = () => {
  const navigate = useNavigate();
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openErrorPopup = (message) => {
    setErrorMessage(message);
    setErrorPopupOpen(true);
  };

  const closeErrorPopup = () => {
    setErrorPopupOpen(false);
  };

  const handleLogin = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await fetch('https://api-be-my-voice.azurewebsites.net/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        //get token and store it in localStorage
        const token = data.data[0].token; 
        localStorage.setItem('token', token); 
        // console.log('Logging in with token:', token);
        if (data.data[0].user.role === 'ADMIN') {
          navigate('../../dashboard');
        }
      } else {
        setErrors({ submit: data.message });
      }      

      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      openErrorPopup('Wrong username or password. Please try again.');
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: 'JoeDoe@gmail.com',
          password: '123456',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={handleLogin} 
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
              />
              {touched.email && errors.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type="password"
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Password"
              />
              {touched.password && errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>

            <Typography variant="subtitle1" color="secondary" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              Forgot Password?
            </Typography>

            {errors.submit && (
              <FormHelperText error>{errors.submit}</FormHelperText>
            )}

            <Button fullWidth size="large" type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
              Sign in
            </Button>
          </form>
        )}
      </Formik>
      <ErrorPopup open={errorPopupOpen} onClose={closeErrorPopup} message={errorMessage} />
    </div>
  );
};

export default FirebaseLogin;
