import React from 'react';
import { Grid } from '@mui/material';
import AuthCoverPage from '../../../common/authCoverPage/AuthCoverPage';
import EmployeeSignUpForm from './EmployeeSignUpForm';


const EmployeeSignUpPage = () => {
  return (
    <Grid container height="auto" sx={{paddingBottom:'50px'}}>
      <Grid item xs={12} sm={6}>
        <AuthCoverPage />
      </Grid>
      <Grid item xs={12} sm={6} display="flex" alignItems="start" justifyContent="center" sx={{ position: 'relative' }}>
        <EmployeeSignUpForm />
      </Grid>     
    </Grid>
  );
};

export default EmployeeSignUpPage;
