import { Box, Typography, Grid, Modal, Avatar, Paper, Divider } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuthContextData } from '../../../context/AuthProvider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import EmployeeProfileUpdateForm from './EmployeeProfileUpdateForm';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EditIcon from '@mui/icons-material/Edit'; // Import the Edit Icon
import WorkingExperience from '../workingExperience/WorkingExperience';

const EmployeeProfile = () => {
  const { setUpdateEmployeeFormData } = useAuthContextData();

  const userDetails = useSelector((state) => state.authReducer.userData);
  const profilePic = useSelector((state) => state.authReducer.profileImage);

  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
    setUpdateEmployeeFormData({
      _id: userDetails._id,
      role: 'employee',
      email: userDetails.email,
      password: userDetails.password,
      mobileNumber: userDetails.mobileNumber,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      position: userDetails.position,
      currentCompany: userDetails.currentCompany,
      location: userDetails.location,
      otp: userDetails.otp,
      isVerified: userDetails.isVerified,
      agreeToTerms: userDetails.agreeToTerms,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            position: 'relative', // Add position relative for the Paper component
          }}
        >
          <Box sx={{ position: 'relative', marginBottom: '20px' }}>
            <Avatar
              alt={`${userDetails.firstName} ${userDetails.lastName}`}
              src={profilePic?.profileImage}
              sx={{
                width: 140,
                height: 140,
                border: '4px solid #0073e6',
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Box>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ marginBottom: '5px', textTransform: 'capitalize' }}
          >
            {`${userDetails.firstName} ${userDetails.lastName}`}
          </Typography>
          
          {/* Edit Icon in the top right corner */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '20px', 
              right: '20px', 
              cursor: 'pointer',
              color: '#0073e6',
            }} 
            onClick={handleEdit}
          >
            <EditIcon fontSize='large' />
          </Box>
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
          <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: '25px' }}>
            Personal Information
          </Typography>

          <Grid container spacing={3}>
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
                <LocationOnIcon sx={{ marginRight: 1 }} /> Location:
              </Typography>
              <Typography variant="body1">{userDetails.location}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ margin: '20px 0' }} />

          <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: '25px' }}>
            Employment
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                <WorkIcon sx={{ marginRight: 1 }} /> Company Name (Current):
              </Typography>
              <Typography variant="body1">{userDetails.currentCompany}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                <WorkOutlineIcon sx={{ marginRight: 1 }} /> Position:
              </Typography>
              <Typography variant="body1">{userDetails.position}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ margin: '20px 0' }} />
          
          <WorkingExperience/>
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
            <EmployeeProfileUpdateForm handleClose={handleClose} setOpen={setOpen} />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default EmployeeProfile;
