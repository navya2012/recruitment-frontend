import React from 'react';
import { Box, Grid } from '@mui/material';
import AuthCoverPage from '../../../common/authCoverPage/AuthCoverPage';
import EmployeeSignUpForm from './EmployeeSignUpForm';


const EmployeeSignUpPage = () => {
  return (
    <Grid container height="100vh" >
    <Grid item xs={12} sm={6}>
    <Box sx={{position: 'sticky',top: 0,height: '100vh', width: '100%',overflow: 'hidden'}}>
        <AuthCoverPage />
      </Box>
    </Grid>
    <Grid item xs={12} sm={6} display="flex" alignItems="start" justifyContent="center" sx={{ position: 'relative',overflowY: 'auto', }}>
      <EmployeeSignUpForm />
    </Grid>
  </Grid>    
  );
};

export default EmployeeSignUpPage;
