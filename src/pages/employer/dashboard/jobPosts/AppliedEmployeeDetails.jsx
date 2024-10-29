import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEmployeeFullDetails } from '../../../../api\'s/employeeApi\'s';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';


const AppliedEmployeeDetails = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const userFullDetails = useSelector((state) => state.employeeReducer.employeeFullDetails);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(getEmployeeFullDetails(id));
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Candidates Details!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#0557A2' }}>
        Ready to jump back in?
      </Typography>

      <Paper sx={{ padding: '30px', borderRadius: '10px' }}>
        <Typography variant='h5' sx={{ mb: 3 }}>User Information</Typography>

        {/* {loading ? (
          <LoadingSpinner />
        ) : (
          <> */}
            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' padding='40px 0'>
              <Avatar
                alt=''
                src={userFullDetails?.profileImage?.profileImage}
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid #0073e6',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                }}
              />
              <Typography
                variant="h5"
                sx={{ textTransform: 'capitalize', color: 'black', padding: '15px 0' }}
              >
                {`${userFullDetails.userDetails.firstName} ${userFullDetails.userDetails.lastName}`}
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textTransform: 'capitalize' }}
              >
                {userFullDetails.userDetails.position}
              </Typography>
            </Box>

            <Box display='flex' justifyContent='space-between' flexWrap='wrap' padding='30px'>
              <Box sx={{ flex: '1 1 50%', paddingRight: '10px'}}>
              <Typography variant='h5' sx={{ mb: 4, fontSize:'30px' }}>Personal Information</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                  <PhoneIcon sx={{ marginRight: 1, fontSize:'28px' }} /> Mobile Number :
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom:'25px'}}>
                  {userFullDetails.userDetails.mobileNumber}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                  <EmailIcon sx={{ marginRight: 1, fontSize:'28px' }} /> Email :
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom:'25px' }}>
                  {userFullDetails.userDetails.email}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                  <LocationOnIcon sx={{ marginRight: 1, fontSize:'28px' }} /> Location :
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom:'25px' }}>
                  {userFullDetails.userDetails.location}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                  <WorkIcon sx={{ marginRight: 1, fontSize:'28px' }} /> Current Company :
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom:'25px' }}>
                  {userFullDetails.userDetails.currentCompany}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                  <SchoolIcon sx={{ marginRight: 1, fontSize:'28px' }} /> Education Level :
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom:'25px' }}>
                  {userFullDetails.workingExperience.graduation}
                </Typography>
              </Box>

              <Box sx={{ flex: '1 1 50%', paddingLeft: '10px' }}>
              <Typography variant='h5' sx={{ mb: 4, fontSize:'30px' }}>Working Experience</Typography>

              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                  <CodeIcon sx={{ marginRight: 1, fontSize:'28px' }} /> Professional Skills :
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom:'25px' }}>
                  {userFullDetails.workingExperience.technologies}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                  <WorkIcon sx={{ marginRight: 1, fontSize:'28px' }} /> Experience :
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom:'25px' }}>
                {userFullDetails.workingExperience.experience}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                  <LanguageIcon sx={{ marginRight: 1, fontSize:'28px' }} /> Languages :
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom:'25px' }}>
                  {userFullDetails.workingExperience.languages}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                  <LocationOnIcon sx={{ marginRight: 1, fontSize:'28px' }} /> Location :
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom:'25px' }}>
                  {userFullDetails.workingExperience.location}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                  <QueryBuilderIcon sx={{ marginRight: 1, fontSize:'28px' }} /> Notice Period :
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom:'25px' }}>
                  {userFullDetails.workingExperience.noticePeriod}
                </Typography>
              </Box>
            </Box>
          {/* </>
        )} */}
      </Paper>
    </>
  );
}

export default AppliedEmployeeDetails;
