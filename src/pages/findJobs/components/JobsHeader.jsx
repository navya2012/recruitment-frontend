import { Box, Typography, Container } from '@mui/material';
import React from 'react';
import backgroundImage from '../../../Assets/jobsHeader.jpeg';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const JobsHeader = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '30vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        textAlign: 'center',
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
            fontWeight: 'bold'
          }}
        >
          Find Jobs
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ justifyContent: 'center' }}>
            <Link underline="hover" sx={{color:'#0557A2'}} href="/home-page">
              Home
            </Link>
            <Typography sx={{ color: '#0557A2' }}>Jobs</Typography>
          </Breadcrumbs>
        </Box>
      </Container>
    </Box>
  );
};

export default JobsHeader;
