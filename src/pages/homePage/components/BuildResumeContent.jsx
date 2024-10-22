import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const BuildResumeContent = () => {
  return (
    <Box
      sx={{
        padding: '40px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={require('../../../Assets/build-resume.webp')}
            alt="Resume Illustration"
            sx={{
              width: '70%',
              borderRadius: '10px',
              objectFit:'cover'
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
            Build a good resume
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            An efficient resume should promote your abilities and include tangible accomplishments that are relevant to the job you apply for. You should also prepare a cover letter that is concise and elaborates on how you can put your skills to use in the organization.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              color: '#fff',
              textTransform: 'none',
              padding: '10px 30px',
              width:'35%',
              height:'50px',
              fontSize:'1 rem'
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
