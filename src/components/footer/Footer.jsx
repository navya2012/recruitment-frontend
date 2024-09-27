import React from 'react';
import { Box, Typography, Button, TextField, Container, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#0557A2',
                color: '#fff',
                padding: '40px 0',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'white' }}>
                            Let's connect!
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            Enter your email to stay updated with our latest job posts offers.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextField
                            variant="outlined"
                            placeholder="Type your email here..."
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: '10px 0 0 10px',
                                height: '56px',
                                width: '180%'
                            }}
                        />
                        <Button
                            variant="contained"
                            color="error"
                            sx={{
                                marginLeft: '0px',
                                borderRadius: '0 10px 10px 0',
                                height: '56px',
                                width: '40%'
                            }}
                        >
                            Join
                        </Button>
                    </Grid>

                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <IconButton sx={{ color: '#fff' }}>
                        <FacebookIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                        <TwitterIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                        <InstagramIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                        <LinkedInIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                        <YouTubeIcon />
                    </IconButton>
                </Box>

                <Typography variant="body2" align="center" sx={{ marginTop: '20px', color: '#ccc' }}>
                    &copy; 2024 Company. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
