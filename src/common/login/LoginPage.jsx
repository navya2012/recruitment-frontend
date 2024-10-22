import React from 'react'
import { Grid } from '@mui/material';
import LoginForm from './LoginForm';
import AuthCoverPage from '../authCoverPage/AuthCoverPage';


const LoginPage = () => {
  return (
    <Grid container height="auto" sx={{paddingBottom:'50px'}}>
      <Grid item xs={12} sm={6}>
        <AuthCoverPage />
      </Grid>
      <Grid item xs={12} sm={6} display="flex" alignItems="start" justifyContent="center" sx={{ position: 'relative' }}>
        <LoginForm />
      </Grid>
    </Grid>
  )
}

export default LoginPage