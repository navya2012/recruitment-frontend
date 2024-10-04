import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppliedJobPostsPostedByEmployer } from '../../../../api\'s/employerApi\'s';
import { Box, Paper, Grid, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const JobCard = styled(Paper)(({ theme }) => ({
  padding: '50px 20px',
  borderRadius: '12px',
  margin: '10px',
  textAlign: 'center',
  boxShadow: theme.shadows[3],
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
}));


const JobAppliedApplications = () => {
  const { userDetails } = useSelector((state) => state?.authReducer)
  const { jobAppliedUsers } = useSelector((state) => state?.employerReducer)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppliedJobPostsPostedByEmployer())
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <>
      <Typography variant="h4" sx={{ color: 'black', mb: 3 }}>
        All Applicants!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Ready to jump back in?
      </Typography>

      <Paper sx={{ padding: '30px', borderRadius: '10px' }}>
        <Typography variant='h5' sx={{ color: 'black', mb: 3 }}>Applicant</Typography>

        <Box sx={{
          position: "relative",
          background: "#F5F7FC",
          borderRadius: '8px',
          padding: ' 25px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: '30px'
        }}>
          <Typography variant='h6' sx={{ color: '#0557A2', mb: 3, }}>{userDetails?.position}</Typography>
          <Typography variant='h6' sx={{ color: '#0557A2', mb: 3 }}>Total: {jobAppliedUsers?.length || 0}</Typography>
        </Box>

        <Grid container spacing={3}>
          {
            jobAppliedUsers.length > 0 ? (
              jobAppliedUsers.map((data, id) => (
                <Grid item xs={12} sm={12} md={6} key={id}>
                  <JobCard elevation={3}>
                    <Avatar
                      alt=''
                      src={data.employee_profileImage}
                      sx={{ width: 80, height: 80, marginRight: '20px' }}
                    />
                    <Box sx={{ textAlign: 'left', textTransform: 'capitalize' }}>
                      <Typography variant="h5" gutterBottom>
                        {data.employee_firstName || "-"} {data.employee_lastName || "-"}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mb: 1.5, flexDirection: { xs: 'column', md: 'row' } }}>
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                          {data.employee_position || "-"}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                          <LocationOnOutlinedIcon />
                          <Typography variant="body1" color="textSecondary" gutterBottom>
                            {data.employee_location || "-"}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        Applied on: {data.employee_jobAppliedDate ? formatDate(data.employee_jobAppliedDate) : "-"}
                      </Typography>
                    </Box>
                  </JobCard>
                </Grid>

              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  No applications found.
                </Typography>
              </Grid>
            )
          }
        </Grid>
      </Paper>
    </>
  );
};

export default JobAppliedApplications;
