import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const BuildResumeContent = () => {
  return (
    <Box
      sx={{
        padding: '30px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Section - Illustration */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={require('../../../Assets/build-resume.webp')}
            alt="Resume Illustration"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
            }}
          />
        </Grid>

        {/* Right Section - Text Content */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Build a good resume
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            An efficient resume should promote your abilities and include tangible accomplishments that are relevant to the job you apply for. You should also prepare a cover letter that is concise and elaborates on how you can put your skills to use in the organization.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#0056D2',
              color: '#fff',
              textTransform: 'none',
              padding: '10px 30px',
              '&:hover': {
                backgroundColor: '#0041A8',
              },
            }}
          >
            Discover More
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuildResumeContent;
