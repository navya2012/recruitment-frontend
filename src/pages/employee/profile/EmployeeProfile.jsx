import { Box, Typography, Grid, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuthContextData } from '../../../context/AuthProvider';
import EditIcon from '@mui/icons-material/Edit';
import EmployeeProfileUpdateForm from './EmployeeProfileUpdateForm';

const EmployeeProfile = () => {
  const { setUpdateEmployeeFormData } = useAuthContextData();
  const { userData } = useSelector((state) => state.authReducer);
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
    setUpdateEmployeeFormData({
      _id: userData._id,
      role: 'employee',
      email: userData.email,
      password: userData.password,
      mobileNumber: userData.mobileNumber,
      firstName: userData.firstName,
      lastName: userData.lastName,
      position: userData.position,
      currentCompany: userData.currentCompany,
      location: userData.location,
      otp: userData.otp,
      isVerified: userData.isVerified,
      agreeToTerms: userData.agreeToTerms,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'60px 0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '0 50px' }}>

        <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { xs: 'center', sm: 'space-between' },
              alignItems: 'center',
              paddingBottom: '40px',
              gap: { xs: '15px', sm: '50px' },
            }}>

            <Typography variant="h4" fontWeight="bold">Personal Information</Typography>
            <EditIcon onClick={handleEdit} fontSize="large" sx={{ color: '#0557A2', cursor: 'pointer' }} />
          </Box>

          <Grid container spacing={2}>
            {[
              { label: 'Name of the Employee', value: `${userData.firstName} ${userData.lastName}` },
              { label: 'Email', value: userData.email },
              { label: 'Mobile Number', value: userData.mobileNumber },
              { label: 'Role', value: userData.position },
              { label: 'Current Company', value: userData.currentCompany },
              { label: 'Location', value: userData.location },
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
          <EmployeeProfileUpdateForm handleClose={handleClose} setOpen={setOpen} />
        </Box>
      </Modal>
    </Box>
  );
};

export default EmployeeProfile;
