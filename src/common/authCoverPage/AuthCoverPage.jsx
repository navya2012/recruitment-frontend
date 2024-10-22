import React from 'react';
import { Box, Typography } from '@mui/material';

const AuthCoverPage = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign:'center'
        }}
      >
        <Typography variant="h4">Welcome to Careerbridge </Typography>
        <Box
            component="img"
            src={require('../../Assets/signup.png')}
            alt="cover page"
            sx={{
              width: '100%',
              borderRadius: '10px',
              objectFit:'cover'
            }}
          />
      </Box>
    </>
  );
};

export default AuthCoverPage;
