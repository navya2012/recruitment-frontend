import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <CircularProgress
        sx={{
          color: '#3f51b5', 
          marginBottom: 2
        }}
        size={60}
        thickness={5}
      />
      <Typography
        variant="h6"
        sx={{
          color: '#3f51b5',
          fontWeight: 'bold'
        }}
      >
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
