import React from 'react';
import { Box, Typography, Button, Container, TextField, Stack } from '@mui/material';
import bgImage from '../../../Assets/newsletter.png'

const NewsLetter = () => {
    return (
        <Box
            sx={{
                padding: '100px',
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Content Box */}
            <Container maxWidth="lg" sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#fff',
                textAlign: 'center',
            }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Subscribe Our Newsletter
                </Typography>

                <Typography variant="body1" sx={{ mb: 4 }}>
                    Advertise your jobs to millions of monthly users and search 15.8 million
                    <Typography
                        component="span"
                        sx={{
                            fontSize: 'inherit',
                            display: 'block'
                        }}
                    >
                        CVs in our database.
                    </Typography>
                </Typography>

                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '600px',
                        padding: '15px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                    }}
                >
                     <Stack direction="row" sx={{ maxWidth: '600px', width: '100%' }}>
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
                            Subscribe
                        </Button>
      </Stack>
                   
                </Box>
            </Container>
        </Box>
    );
};

export default NewsLetter;
