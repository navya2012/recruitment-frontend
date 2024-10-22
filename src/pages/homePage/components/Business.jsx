import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import React from 'react'

const Business = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2, padding: '100px 0' }}>
                <Typography variant='h4' sx={{ color: 'black' }} gutterBottom> Few Simple Steps for Successful Business</Typography>
                <Typography variant='body2' sx={{ mb: 5 }} gutterBottom>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</Typography>

                <Grid container spacing={4} >
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 400, mx: 'auto', padding: '40px' }}>
                            <CardMedia
                                component="img"
                                image={require('../../../Assets/businessImage1.webp')}
                                alt="Card Title 1"
                                sx={{
                                            height: '200px',
                                            objectFit: 'cover'
                                        }}
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    <span style={{ color: '#e13f52', fontSize: '20px' }}>01</span>{' '}
                                    <span style={{ fontWeight: 'bold', color: 'black' }}>Free Resume Assessments</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem' }}>
                                    Achieve virtually any design and layout from within the one template.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 400, mx: 'auto', padding: '40px' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: '200px',
                                    objectFit: 'cover'
                                }}
                                image={require('../../../Assets/businessImage1.webp')}
                                alt="Card Title 1"
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    <span style={{ color: '#e13f52', fontSize: '20px' }}>02</span>{' '}
                                    <span style={{ fontWeight: 'bold', color: 'black' }}>Help Every Step of the Way</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem' }}>
                                    Achieve virtually any design and layout from within the one template.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 400, mx: 'auto', padding: '40px' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: '200px',
                                    objectFit: 'cover'
                                }}
                                image={require('../../../Assets/businessImage3.webp')}
                                alt="Card Title 1"
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    <span style={{ color: '#e13f52', fontSize: '20px' }}>03</span>{' '}
                                    <span style={{ fontWeight: 'bold', color: 'black' }}>Job Fit Scoring</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem' }}>
                                    Achieve virtually any design and layout from within the one template.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Business