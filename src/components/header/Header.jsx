import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import backgroundImage from '../../Assets/headerImage.png';

const Header = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '70vh',
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
      <Container sx={{ zIndex: 2, position: 'relative', color:'black' }}>
        <Typography
          variant="button"
          sx={{
            fontSize: '16px',
            textTransform: 'capitalize',
            letterSpacing: '1px',
            marginBottom: '16px',
            display: 'block',
          }}
        >
          <Button variant="outlined" size="small" 
          sx={{
                padding:'10px 50px ',
                borderRadius:'30px',
                color:'black',
                fontWeight:'bold'
           }}
          >
          The best job seeker
          </Button>
        </Typography>

        <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '16px' , }}>
          Find jobs that match your{' '}
          <Typography
            component="span"
            sx={{
              fontWeight: 'bold',
              color: '#0073e6',
              fontSize: 'inherit',
              display:'block'
            }}
          >
            preferences
          </Typography>
        </Typography>

        <Typography variant="subtitle1" sx={{ color: 'black', marginBottom: '32px' }}>
          Discover a personalized job search experience where every listing matches your preferences,
          providing a tailored platform that streamlines your journey to finding the perfect job.
        </Typography>

        <Typography variant="body2" sx={{ color: 'GrayText' }}>
          Popular search:{' '}
          <Typography component="span" sx={{ color: '#0073e6', cursor: 'pointer' }}>
            Development
          </Typography>
          ,{' '}
          <Typography component="span" sx={{ color: '#0073e6', cursor: 'pointer' }}>
            Marketing & Sales
          </Typography>
          ,{' '}
          <Typography component="span" sx={{ color: '#0073e6', cursor: 'pointer' }}>
            Content Writer
          </Typography>
          ,{' '}
          <Typography component="span" sx={{ color: '#0073e6', cursor: 'pointer' }}>
            UI/UX Design
          </Typography>
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;
