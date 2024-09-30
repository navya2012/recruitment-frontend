import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const JobSearchContent = () => {
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
        {/* Left Section - Text Content */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Search for jobs
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            To start searching for jobs, you can attend job fairs online or in person, use job boards and career websites, or reach out directly to recruiters in a targeted company to broaden your network.
          </Typography>

          <Box component="ul" sx={{ pl: 3 }}>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              ✔️ Bring to the table win-win survival
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              ✔️ Capitalize on low-hanging fruit to identify
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 3 }}>
              ✔️ But I must explain to you how all this
            </Typography>
          </Box>

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

        {/* Right Section - Image/Illustration */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={require('../../../Assets/job-search.webp')}
            alt="Job search illustration"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobSearchContent;
