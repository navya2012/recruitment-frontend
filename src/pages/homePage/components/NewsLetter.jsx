import React from 'react';
import { Box, Typography, Button, Container, TextField, Stack } from '@mui/material';
import bgImage from '../../../Assets/newsletter.png'

const NewsLetter = () => {
    return (
        <Box
            sx={{
                padding: '80px 0',
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Container maxWidth="lg" sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#fff',
                textAlign: 'center',
            }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize:'38px', mb: 2 }}>
                    Subscribe Our Newsletter
                </Typography>

                <Typography variant="body2" sx={{ mb: 4 }}>
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
                        justifyContent:'center',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth:  { xs:'300px', md:'650px'},
                        padding: '20px',
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
                                marginTop: '0px',
                                borderRadius: '0 10px 10px 0',
                                height: '56px',
                                width: {xs:'120%', md:'60%'}
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
