import { Box, Typography, Grid, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuthContextData } from '../../../context/AuthProvider';
import EditIcon from '@mui/icons-material/Edit';
import EmployerProfileUpdateForm from './EmployerProfileUpdateForm';

const EmployerProfile = () => {
    const { setUpdateEmployerFormData } = useAuthContextData();
    const { userData } = useSelector((state) => state.authReducer);
    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        setOpen(true);
        setUpdateEmployerFormData({
            _id: userData._id,
            role: 'employer',
            email: userData.email,
            password: userData.password,
            mobileNumber: userData.mobileNumber,
            companyName: userData.companyName,
            companyType: userData.companyType,
            address: {
                street: userData.address.street,
                city: userData.address.city,
                state: userData.address.state,
                country: userData.address.country,
                zipCode: userData.address.zipCode,
            },
            employeesCount: userData.employeesCount,
            headQuarters: userData.headQuarters,
            otp: userData.otp,
            isVerified: userData.isVerified,
            agreeToTerms: userData.agreeToTerms,
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

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '0 50px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: { xs: 'center', sm: 'space-between' },
                        alignItems: 'center',
                        paddingBottom: '40px',
                        gap: { xs: '15px', sm: '50px' },
                    }}
                >
                    <Typography variant="h4" fontWeight="bold">Personal Information</Typography>
                    <EditIcon onClick={handleEdit} fontSize="large" sx={{ color: '#0557A2', cursor: 'pointer' }} />
                </Box>

                <Grid container spacing={2}>
                    {[
                        { label: 'Company Name', value: userData.companyName },
                        { label: 'Email', value: userData.email },
                        { label: 'Mobile Number', value: userData.mobileNumber },
                        { label: 'Company Type', value: userData.companyType },
                        { label: 'Address', value: formatAddress(userData.address) },
                        { label: 'No of Employees', value: userData.employeesCount },
                        { label: 'Head Quarters', value: userData.headQuarters },
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Box
                                sx={{
                                    padding: '20px',
                                    border: '2px solid #0557A2',
                                    borderRadius: '15px',
                                    backgroundColor: '#fff',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 'bold',
                                        marginBottom: '10px',
                                        color: '#0557A2',
                                        fontSize: '18px',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {item.label}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '16px',
                                        color: '#333',
                                        fontWeight: 'normal',
                                        overflowWrap: 'break-word',
                                    }}
                                >
                                    {item.value}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-profile-modal-title"
                aria-describedby="edit-profile-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: 24,
                    width: '90%',
                    maxWidth: '750px',
                }}>
                    <EmployerProfileUpdateForm handleClose={handleClose} setOpen={setOpen} />
                </Box>
            </Modal>
        </Box>
    );
};

export default EmployerProfile;
