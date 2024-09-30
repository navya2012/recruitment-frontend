import React from 'react';
import { Grid } from '@mui/material';
import AuthCoverPage from '../../../common/authCoverPage/AuthCoverPage';
import EmployerSignUpForm from './EmployerSignUpForm';

const EmployerSignUpPage = () => {
  return (
    <Grid container height="auto" sx={{paddingBottom:'50px'}}>
      <Grid item xs={12} sm={6}>
        <AuthCoverPage />
      </Grid>
      <Grid item xs={12} sm={6} display="flex" alignItems="start" justifyContent="center">
        <EmployerSignUpForm />
      </Grid>
    </Grid>                                
  ); 
};                              

export default EmployerSignUpPage;
