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
        height: '100vh', // Full-screen height
        backgroundColor: '#f5f5f5', // Light background color
      }}
    >
      <CircularProgress
        sx={{
          color: '#3f51b5', // Primary theme color for the spinner
          marginBottom: 2, // Spacing below the spinner
        }}
        size={60} // Spinner size
        thickness={5} // Spinner thickness
      />
      <Typography
        variant="h6"
        sx={{
          color: '#3f51b5', // Text color matching the spinner
          fontWeight: 'bold',
        }}
      >
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
