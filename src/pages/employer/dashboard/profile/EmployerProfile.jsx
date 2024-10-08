import { Box, Typography, Grid, Avatar, Paper, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContextData } from '../../../../context/AuthProvider';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';
import { getUserImages } from '../../../../api\'s/authApi\'s';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';

const EmployerProfile = () => {
    const { setUpdateEmployerFormData } = useAuthContextData();

    const [loading, setLoading] = useState(false)

    const profilePic = useSelector((state) => state.authReducer.profileImage);
    const userDetails = useSelector((state) => state.authReducer.userData);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getUserImages());
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    const handleEdit = () => {
        navigate('/employer-dashboard/edit-employer-profile')
        setUpdateEmployerFormData({
            _id: userDetails._id,
            role: 'employer',
            email: userDetails.email,
            password: userDetails.password,
            mobileNumber: userDetails.mobileNumber,
            companyName: userDetails.companyName,
            companyType: userDetails.companyType,
            address: {
                street: userDetails.address.street,
                city: userDetails.address.city,
                state: userDetails.address.state,
                country: userDetails.address.country,
                zipCode: userDetails.address.zipCode,
            },
            employeesCount: userDetails.employeesCount,
            headQuarters: userDetails.headQuarters,
            otp: userDetails.otp,
            isVerified: userDetails.isVerified,
            agreeToTerms: userDetails.agreeToTerms,
        });
    };

    const formatAddress = (address) => {
        return [address?.street, address?.city, address?.state, address?.country, address?.zipCode]
            .filter(Boolean)
            .join(', ');
    };

    const userProfileImage = profilePic.find((pic) => pic.user_id === userDetails._id);

    return (
        <>
            <Typography variant="h4" sx={{ color: 'black', mb: 3 }}>
                View Profile!
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
                Ready to jump back in?
            </Typography>

            <Paper sx={{ padding: '40px', borderRadius: '10px' }}>
                <Typography variant='h5' sx={{ color: 'black', mb: 3 }}>My Profile</Typography>

                {
                    loading ? (
                        <LoadingSpinner />
                    ) : (
                        <Box
                            sx={{
                                padding: '50px 0',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative'
                            }}
                        >
                            <Avatar
                                alt=''
                                src={userProfileImage?.profileImage}
                                sx={{
                                    width: 140,
                                    height: 140,
                                    border: '4px solid #0073e6',
                                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                                }}
                            />
                            <IconButton
                                onClick={handleEdit}
                                sx={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    color: '#0073e6',
                                }}
                            >
                                <EditIcon fontSize='large' />
                            </IconButton>

                            <Grid container spacing={4} sx={{ padding: { md: '50px 20px 50px 130px', xs: '50px 20px' } }}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                                        <WorkIcon sx={{ marginRight: 1 }} /> Company Name:
                                    </Typography>
                                    <Typography variant="body1">{userDetails.companyName}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                                        <EmailIcon sx={{ marginRight: 3 }} /> Email:
                                    </Typography>
                                    <Typography variant="body1">{userDetails.email}</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                                        <PhoneIcon sx={{ marginRight: 1 }} /> Mobile Number:
                                    </Typography>
                                    <Typography variant="body1">{userDetails.mobileNumber}</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                                        <BusinessIcon sx={{ marginRight: 1 }} /> Company Type:
                                    </Typography>
                                    <Typography variant="body1">{userDetails.companyType}</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                                        <HomeIcon sx={{ marginRight: 1 }} /> Address:
                                    </Typography>
                                    <Typography variant="body1">{formatAddress(userDetails.address)}</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                                        <GroupIcon sx={{ marginRight: 1 }} /> No of Employees:
                                    </Typography>
                                    <Typography variant="body1">{userDetails.employeesCount}</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                                        <LocationOnIcon sx={{ marginRight: 1 }} /> Head Quarters:
                                    </Typography>
                                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{userDetails.headQuarters}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    )
                }
            </Paper>
        </>
    );
};

export default EmployerProfile;
