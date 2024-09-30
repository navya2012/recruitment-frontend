import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import firstImage from '../../../Assets/banner.png';
import secondImage from '../../../Assets/header.webp';
import SearchIcon from '@mui/icons-material/Search';

const BannerSection = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'block',
        padding: '0 55px',
        backgroundColor: '#fff'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'absolute',
            top: '0', left: '0', right: '0', bottom: '0',
            height: 'auto',
            overflow: 'hidden'
          }}
        >
          <img
            src={firstImage}
            alt="First"
            width='1583'
            height='599'
            style={{
              width: '100%',
              maxWidth: '100%',
              height: '100%',
              color: 'transparent',
              borderRadius: '32px',
              display: 'inline-block',
              verticalAlign: 'middle',
              objectFit: 'cover'
            }}
          />
          <img
            src={secondImage}
            width='916'
            height='516'
            alt="Second"
            style={{
              position: 'absolute',
              bottom: 0,
              right: '-90px',
              margin: '0 0 1rem'
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            position: 'relative',
            margin: '0 auto',
            maxWidth: '1300px',
            width: '100%',
            padding: '130px 0px',

          }}
        >
          <Typography variant="h3" align="left" sx={{ mb: 2, fontWeight: 'bold', color: 'black', fontSize: { xs: '41px' } }}>
            Join us & Explore
            <Typography
              variant="h3"
              component="span"
              sx={{
                fontWeight: 'inherit',
                display: 'block',
                fontSize: { xs: '41px' }
              }}
            > Thousands of Jobs
            </Typography>
          </Typography>
          <Typography variant="subtitle1" align="left" color="textSecondary" paragraph>
            Find Jobs, Employment & Career Opportunities
          </Typography>

          <Box
            sx={{
              paddingTop: '20px',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >

            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: '1000px',
                gap: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '20px 30px',
                borderRadius: '10px',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', gap: 2, }}>
                <Typography variant='h6'>What</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 2 }}>
                  <Typography variant='body1'>Job Titles, Keywords or Company</Typography>
                  <SearchIcon />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', gap: 2 }}>
                <Typography variant='h6'>What</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 2 }}>
                  <Typography variant='body1'>Job Titles, Keywords or Company</Typography>
                  <SearchIcon />
                </Box>
              </Box>

              <Box
                component="div"
                sx={{
                  fontSize: '16px',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#0557A2',
                  color: '#fff',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                Find Jobs
              </Box>
            </Box>

            {/* Popular Searches */}
            <Typography
              variant="h6"
              sx={{ mt: 2 }}
            >
              Popular Searches:
              <Typography
                variant="body1"
                component="span">
                Designer, Developer, Web, iOS, PHP, Senior,
                Engineer
              </Typography>
            </Typography>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default BannerSection;
