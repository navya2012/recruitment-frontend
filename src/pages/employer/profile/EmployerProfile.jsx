import { Box, Typography, Grid, Modal, Avatar, Paper, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuthContextData } from '../../../context/AuthProvider';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmployerProfileUpdateForm from './EmployerProfileUpdateForm';
import WorkIcon from '@mui/icons-material/Work';

const EmployerProfile = () => {
    const { setUpdateEmployerFormData } = useAuthContextData();

    const profilePic = useSelector((state) => state.authReducer.profileImage);
    const userDetails = useSelector((state) => state.authReducer.userData);

    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        setOpen(true);
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
        return [address.street, address.city, address.state, address.country, address.zipCode]
            .filter(Boolean)
            .join(', ');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const userProfileImage = profilePic.find((pic) => pic.user_id === userDetails._id);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px 0', backgroundColor: '#f5f6fa' }}>
            <Box
                sx={{
                    width: '75%',
                    maxWidth: '900px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: '100%',
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '10px',
                        marginBottom: '30px',
                        position: 'relative', // Make this relative for absolute positioning of the button
                    }}
                >
                    <Box sx={{ position: 'relative', marginBottom: '20px' }}>
                        <Avatar
                            alt=''
                            src={userProfileImage?.profileImage} // Add the profile image URL if available
                            sx={{
                                width: 140,
                                height: 140,
                                border: '4px solid #0073e6',
                                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                            }}
                        />
                    </Box>

                    {/* Edit button in the top right corner */}
                    <IconButton
                        onClick={handleEdit}
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            color: '#0073e6',
                        }}
                    >
                        <EditIcon fontSize='large'/>
                    </IconButton>
                </Paper>

                <Paper
                    elevation={1}
                    sx={{
                        width: '100%',
                        padding: '20px',
                        borderRadius: '10px',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                                <WorkIcon sx={{ marginRight: 1 }} /> Company Name:
                            </Typography>
                            <Typography variant="body1">{userDetails.companyName}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                                <EmailIcon sx={{ marginRight: 1 }} /> Email:
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
                </Paper>

                {/* Modal for editing the profile */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="edit-profile-modal-title"
                    aria-describedby="edit-profile-modal-description"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Box
                        sx={{
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            backgroundColor: 'white',
                            padding: '40px',
                            borderRadius: '8px',
                            boxShadow: 24,
                            width: '90%',
                            maxWidth: '750px',
                        }}
                    >
                        <EmployerProfileUpdateForm handleClose={handleClose} setOpen={setOpen} />
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default EmployerProfile;
