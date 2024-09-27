import React, { useEffect } from 'react';
import { getAllJobPostsAppliedByEmployees, getAllJobPostsData, JobAppliedPostsStatus } from '../../../api\'s/employeeApi\'s';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, CardContent, Grid, Paper, styled, Typography, Chip } from '@mui/material';
import JobsHeader from '../../../common/jobsHeader/JobsHeader';

// Styled button with modern look
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  width: '130px',
  backgroundColor: '#000',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#333',
  },
}));

// Styled card for job posts
const StyledCard = styled(Card)(({ theme }) => ({
  padding: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  border: '2px solid #0557A2',
  borderRadius: '15px',
}));

const TagChip = styled(Chip)(({ theme }) => ({
  borderRadius: '10px',
  marginRight: '10px',
  fontWeight: 'bold',
  fontSize: '15px'
}));

const JobPostsData = () => {
  const { allJobPosts, jobAppliedPosts } = useSelector((state) => state.employeeReducer);
  const currentEmployeeId = useSelector((state) => state.authReducer.userData._id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobPostsData());
    dispatch(getAllJobPostsAppliedByEmployees());
  }, [dispatch]);

  const handleJobApply = async (jobId) => {
    try {
      await dispatch(JobAppliedPostsStatus(jobId));
      dispatch(getAllJobPostsAppliedByEmployees());
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <>
    <JobsHeader/>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ width: '100%' }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '70px' }}>

          <Typography variant="h4" sx={{ paddingBottom: '50px', textAlign: 'center' }} fontWeight="bold">
            Job Offers
          </Typography>

          <Grid container spacing={3}>
            {allJobPosts.length > 0 ? (
              allJobPosts.map((job) => (
                <Grid item xs={12} sm={6} md={4} key={job._id}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '25px' }}>
                        {job.companyName}
                      </Typography>

                      <Typography variant="subtitle1" sx={{ margin: '15px 0', fontSize: '18px' }}>
                        {job.role}
                      </Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <TagChip label={job.technologies} />
                        <TagChip label={job.experience} />
                        <TagChip label={job.graduation} />
                        <TagChip label={job.location} />
                        <TagChip label={job.languages} />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <StyledButton
                          onClick={() => handleJobApply(job._id)}
                          variant="contained"
                          disabled={jobAppliedPosts.some((post) => post.jobId === job._id && post.employee_id === currentEmployeeId)}
                        >
                          {jobAppliedPosts.some((post) => post.jobId === job._id && post.employee_id === currentEmployeeId)
                            ? 'Applied'
                            : 'Apply Now'}
                        </StyledButton>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))
            ) : (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100vh',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>
                    No posts found.
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Box>
      </Paper>
    </Box>
    </>
  );
};

export default JobPostsData;
