import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import AuthCoverPage from '../authCoverPage/AuthCoverPage';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../api\'s/authApi\'s';
import LoadingSpinner from '../spinner/LoadingSpinner';
import ClearIcon from '@mui/icons-material/Clear';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await forgotPassword(email, navigate);
            if (response.success) {
                setEmail('');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClearEmail = () => {
        setEmail('');
    };

    return (
        <>
            <Grid container sx={{ height: '100vh' }}>
                <Grid item xs={12} sm={6}>
                    <AuthCoverPage />
                </Grid>

                <Grid item xs={12} sm={6} display="flex" alignItems="start" justifyContent="center" sx={{ position: 'relative' }}>
                    <Box className='form-page-styles' sx={{ width: '100%', position: 'relative', height: '100vh' }}>
                        {
                            loading ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        zIndex: 10
                                    }}
                                >
                                    <LoadingSpinner />
                                </Box>
                            ) : (
                                <>
                                    <Typography variant="h4" sx={{ paddingBottom: '40px' }}>
                                        Forgot Password
                                    </Typography>
                                    <Box component='form' onSubmit={handleSubmit}>
                                        <Typography variant="body2" sx={{ paddingBottom: '20px', color: '#7D8FB3' }}>
                                            Enter the email address you used to create the account.
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            label="Email"
                                            name="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                  <InputAdornment position='end'>
                                                    <IconButton onClick={handleClearEmail}>
                                                      {email ? <ClearIcon sx={{color:'black'}} /> : null} 
                                                    </IconButton>
                                                  </InputAdornment>
                                                )
                                              }}
                                        />
                                        <Button type="submit" variant="contained" sx={{ marginTop: '40px' }}>
                                            Send OTP
                                        </Button>
                                    </Box>
                                </>
                            )}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default ForgotPassword;
