import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, styled, TextField, Typography } from '@mui/material';
import '../../CSSModules/formStyles/formPageStyles.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthCoverPage from '../authCoverPage/AuthCoverPage';
import { resendOtp, verifyOtp } from '../../api\'s/authApi\'s';
import LoadingSpinner from '../spinner/LoadingSpinner';

const TimerStyle = styled(Typography)(({ theme }) => ({
    color: "#0557A2",
    fontSize: "16px",
    fontWeight: "700",
    padding: '30px 0'
}));

const OTPVerification = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // Function to format time in mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        if (timer === 0) {
            toast.error("OTP has expired. Please Resend Code.", {
                position: "top-center",
                autoClose: 3000,
            });
            setCanResend(true);
            return;
        }
        const intervalId = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timer]);

    const handleOtpChange = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;

        // Move focus to the next input
        if (e.target.value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        setOtp(newOtp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (timer === 0) {
            toast.error("OTP has expired. Please Resend Code.", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }
        const otpString = otp.join('');
        try {
            const response = await verifyOtp(otpString, navigate);
            if (response.success) {
                setOtp(Array(6).fill(''));
            }
        } catch (err) {
            throw new Error(err.message)
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true)
        try {
            const response = await resendOtp();
            if (response.success) {
                setTimer(120);
                setOtp(Array(6).fill(''));
                setCanResend(false); // Disable resend button while timer is active
            }
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Grid container height="auto" sx={{ paddingBottom: '50px' }}>
                <Grid item xs={12} sm={6}>
                    <AuthCoverPage />
                </Grid>
                {
                    loading ? (
                        <LoadingSpinner />
                    ) : (
                        <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="center">
                            <Box className='form-page-styles'>
                                <Typography variant="h4" sx={{ paddingBottom: '15px' }}>
                                    Verify your email address
                                </Typography>
                                <Box component='form' onSubmit={handleSubmit}>
                                    <Typography variant="body2" sx={{ paddingBottom: '20px', color: '#7D8FB3' }}>
                                        Please enter the 6-digit code sent to your email:
                                    </Typography>
                                    <Box display="flex" gap={1}>
                                        {otp.map((value, index) => (
                                            <TextField
                                                key={index}
                                                id={`otp-input-${index}`}
                                                variant="outlined"
                                                value={value}
                                                onChange={(e) => handleOtpChange(e, index)}
                                                inputProps={{ maxLength: 1 }}
                                                className='otp-field'
                                            />
                                        ))}
                                    </Box>
                                    <Box display='flex' alignItems="center" justifyContent="space-between" flexWrap="wrap">
                                        <TimerStyle variant="body2">
                                            {formatTime(timer)}
                                        </TimerStyle>
                                        <Button
                                            variant="text"
                                            onClick={handleResendOtp}
                                            disabled={!canResend}
                                        >
                                            Resend OTP
                                        </Button>
                                    </Box>
                                    <Button type="submit" variant="contained">Submit</Button>
                                </Box>
                            </Box>
                        </Grid>
                    )
                }
            </Grid>
        </>
    );
}

export default OTPVerification;
