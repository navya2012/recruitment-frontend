import { Box, Typography, Grid, Avatar, Paper, Divider, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EditIcon from '@mui/icons-material/Edit';
import WorkingExperience from '../workingExperience/WorkingExperience';
import { useAuthContextData } from '../../../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../../../common/spinner/LoadingSpinner';
import { getUserImages } from '../../../../../api\'s/authApi\'s';



const EmployeeProfile = () => {
  const { setUpdateEmployeeFormData } = useAuthContextData();

  const [loading, setLoading] = useState(true);

  const userDetails = useSelector((state) => state.authReducer.userData);
  const profilePic = useSelector((state) => state.authReducer.profileImage);

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
    navigate('/candidate-dashboard/edit-employee-profile')
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

  const userProfileImage = profilePic.find((pic) => pic.user_id === userDetails._id);

  return (
    <>
      <Typography variant="h4" sx={{  mb: 3 }}>
        My Profile!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color:'#0557A2'  }} >
        Ready to jump back in?
      </Typography>

      <Paper sx={{ padding: '30px', borderRadius: '10px' }}>
        <Typography variant='h5' sx={{  mb: 2 }}>My Profile</Typography>

        {
          loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Box
                sx={{
                  padding: '30px ',
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
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ margin: '25px 0', textTransform: 'capitalize' }}
                >
                  {`${userDetails.firstName} ${userDetails.lastName}`}
                </Typography>
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

              </Box>

              <Box sx={{ padding: '0 0 30px  130px' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ margin: '25px 0', }}>
                  Personal Information :
                </Typography>

                <Grid container spacing={4} >
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
              </Box>

              <Divider sx={{ margin: '20px 0' }} />

              <Box sx={{ padding: '0 0 40px  130px' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: '25px' }}>
                  Employment :
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
              </Box>

              <Divider sx={{ margin: '20px 0' }} />

              <Box sx={{ padding: '0 0 30px  130px' }}>
                <WorkingExperience />
              </Box>
            </>
          )
        }
      </Paper>
    </>

  );
};

export default EmployeeProfile;
