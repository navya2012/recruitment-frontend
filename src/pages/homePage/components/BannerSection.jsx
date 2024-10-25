import React from 'react';
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import firstImage from '../../../Assets/banner.png';
import secondImage from '../../../Assets/header.webp';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const BannerSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${firstImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box sx={{ padding: { xs: '85px 30px', md: '65px 90px' } }}>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            <Typography variant="h4" align="left" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '38px' } }}>
              Join us & Explore
              <Typography variant="h4" component="span" sx={{ mt: 2, fontWeight: 'inherit', display: 'block', fontSize: { xs: '41px' } }}>
                Thousands of Jobs
              </Typography>
            </Typography>
            <Typography variant="subtitle1" align="left" color="textSecondary" paragraph>
              Find Jobs, Employment & Career Opportunities
            </Typography>

            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'column', lg: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                 maxWidth: '1005%',
                gap: 2,
                backgroundColor: 'white',
                padding: ' 15px',
                borderRadius: '10px',
              }}
            >
              <TextField placeholder='Job Titles, Keywords or Company'
                variant="outlined" fullWidth
                margin="normal"
               // label='Job Titles, Keywords or Company'
                size='small'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined" fullWidth
                margin="normal"
                label='City Or Postcodes'
                size='small'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationOnOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ width: '45%', borderRadius: '10px', height: '45px', fontSize: '1rem', fontWeight: '500', margin:' 0' }}
              >
                Find Jobs
              </Button>
            </Box>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Popular Searches:
              <Typography variant="body1" component="span">
                Designer, Developer, Web, iOS, PHP, Senior, Engineer
              </Typography>
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={secondImage}
              alt="Job search illustration"
              sx={{
                objectFit: 'cover',
                width: '92%',
                borderRadius: '10px',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BannerSection;
