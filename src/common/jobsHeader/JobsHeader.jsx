import { Box, Typography, Container } from '@mui/material';
import React from 'react';
import backgroundImage from '../../Assets/jobsHeader.jpeg';

const JobsHeader = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        position: 'relative',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <Container sx={{ zIndex: 2, position: 'relative' }}>
        <Typography
          variant="h4"
          sx={{
            textTransform: 'capitalize',
            letterSpacing: '1px',
            marginBottom: '16px',
            display: 'block',
            color:'black',
            fontWeight:'bold'
          }}
        >
          Jobs Grid
        </Typography>

        <Typography variant="subtitle1" sx={{ color: 'black', marginBottom: '32px' }}>
        Dive into our jobs grid, showcasing a vibrant array of career opportunities designed{'  '} 
        <Typography
            component="span"
            sx={{
              fontSize: 'inherit',
              display:'block'
            }}
          >
        to help you embark on your professional journey
        </Typography>
        </Typography>
      </Container>
    </Box>
  );
};

export default JobsHeader;
