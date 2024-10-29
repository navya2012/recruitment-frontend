import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const JobSearchContent = () => {
  return (
    <Box
      sx={{
        padding: '40px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        margin: '30px 0',
        borderRadius:'15px'
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4}}>
            Search for jobs
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            To start searching for jobs, you can attend job fairs online or in person, use job boards and career websites, or reach out directly to recruiters in a targeted company to broaden your network.
          </Typography>

          <Box  sx={{ pl: 3 }}>
            <Typography  variant="body1" sx={{ mb: 1 }}>
              ✔️ Bring to the table win-win survival
            </Typography>
            <Typography  variant="body1" sx={{ mb: 1 }}>
              ✔️ Capitalize on low-hanging fruit to identify
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              ✔️ But I must explain to you how all this
            </Typography>
          </Box>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                color: '#fff',
                textTransform: 'none',
                padding: '10px 30px',
                width:'35%',
                height: '50px',
                fontSize:'1 rem'
              }}
            >
              Discover More
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={require('../../../Assets/job-search.webp')}
            alt="Job search illustration"
            sx={{
               objectFit:'cover',
              width: '92%',
              borderRadius: '10px',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobSearchContent;
