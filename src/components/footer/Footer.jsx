import React from 'react';
import { Grid, Container, Typography, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#f5f5f5', padding: { xs: '20px', md: '100px 90px' } }}>
      <Container>
        <Grid container spacing={4}> 
          <Grid item xs={12} sm={6} md={2.4} sx={{ mb: 6, lineHeight: 1.8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Box component="img" src={require('../../Assets/logo.png')} alt="logo" sx={{ height: 50, mr: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000' }}>
                Superio
              </Typography>
            </Box >
            <Box sx={{ mb: 2, lineHeight: 1}}>
            <Typography variant="body1" gutterBottom>Call Us</Typography>
            <Typography variant="body1" color='primary' gutterBottom>123 456 720</Typography>
            </Box>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>329 Queensberry Street, North Melbourne VIC</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>3051, Australia.</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>support@superio.com</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4} >
            <Typography variant="h6" gutterBottom sx={{ mb: 6, lineHeight: 1.8 }}>For Candidates</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Browse Jobs</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Browse Categories</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Candidate Dashboard</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Job Alerts</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>My Bookmarks</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2.4} >
            <Typography variant="h6" gutterBottom sx={{ mb: 6, lineHeight: 1.8 }}>For Employers</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Browse Candidates</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Employer Dashboard</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Add Job</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Job Packages</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2.4} >
            <Typography variant="h6" gutterBottom sx={{ mb: 6, lineHeight: 1.8 }}>About Us</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>About Us</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Job Page Invoice</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Candidate Dashboard</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Terms Page</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Blog</Typography>
            <Typography variant="body2" gutterBottom sx={{ lineHeight: 2 }}>Contact</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2.4} >
            <Typography variant="h6" gutterBottom sx={{ mb: 6, lineHeight: 1.8 }}>Mobile Apps</Typography>
            <Typography variant="body2" gutterBottom>Click and Get Started in Seconds</Typography>
          </Grid>         
        </Grid>


        <Grid container spacing={2} sx={{ marginTop: '40px' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ lineHeight: '1.8' }}>
              © 2023 Superio by ib-themes. All Right Reserved.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} textAlign="right">
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: 2 }}>
              <IconButton href="https://www.facebook.com" target="_blank" aria-label="Facebook" sx={{ color: '#1877f2' }}>
                <Facebook fontSize="large" />
              </IconButton>

              <IconButton href="https://www.twitter.com" target="_blank" aria-label="Twitter" sx={{ color: '#1DA1F2' }}>
                <Twitter fontSize="large" />
              </IconButton>

              <IconButton href="https://www.instagram.com" target="_blank" aria-label="Instagram" sx={{ color: '#E4405F' }}>
                <Instagram fontSize="large" />
              </IconButton>

              <IconButton href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn" sx={{ color: '#0A66C2' }}>
                <LinkedIn fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
