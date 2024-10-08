import React, { useEffect, useState } from 'react';
import { getAllJobPostsAppliedByAllEmployees, getAllJobPostsData, JobAppliedPostsStatus } from '../../../api\'s/employeeApi\'s';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, CardContent, Grid, styled, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  width: '130px',
  backgroundColor: '#0557a2',
  color: '#fff'
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: '20px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  border: '2px solid #0557A2',
  borderRadius: '15px',
}));

const FindJobPosts = () => {
  const { allJobPosts, allUsersAppliedJobPosts } = useSelector((state) => state?.employeeReducer);
  const currentEmployeeId = useSelector((state) => state.authReducer.userData._id);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(getAllJobPostsData());
    dispatch(getAllJobPostsAppliedByAllEmployees());
  }, [dispatch]);

  const handleJobApply = async (jobId) => {
    try {
      await dispatch(JobAppliedPostsStatus(jobId));
      dispatch(getAllJobPostsAppliedByAllEmployees());
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Filter out jobs that the user has already applied to
  const filteredJobs = allJobPosts.filter((job) =>
    !allUsersAppliedJobPosts.some((appliedJob) => appliedJob.jobId === job._id && appliedJob.employee_id === currentEmployeeId)
  );

  // Calculate total number of jobs and jobs for the current page
  const totalJobs = filteredJobs.length;
  const jobsToDisplay = filteredJobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

          <Typography variant="h6" sx={{ textAlign: 'left', padding: '0 0 50px 30px', width: '100%' }}>
            Show {jobsToDisplay.length} of {totalJobs} jobs
          </Typography>

          <Grid container spacing={3}>
            {jobsToDisplay.length > 0 ? (
              jobsToDisplay.map((job) => (
                <Grid item xs={12} sm={6} md={6} key={job._id}>
                  <StyledCard>
                    <CardContent>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" fontWeight="bold">
                          {job.companyName}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ margin: '15px 0', fontSize: '18px' }}>
                          {job.role}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EngineeringIcon sx={{ marginRight: '8px' }} />
                            <Typography>
                              {Array.isArray(job.technologies) && job.technologies.length > 0
                                ? job.technologies.join(', ')
                                : job.technologies || 'N/A'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SchoolIcon sx={{ marginRight: '8px' }} />
                            <Typography>{job.experience}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ marginRight: '8px' }} />
                            <Typography>{job.location}</Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SchoolIcon sx={{ marginRight: '8px' }} />
                            <Typography>{job.graduation}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LanguageIcon sx={{ marginRight: '8px' }} />
                            <Typography>{job.languages.join(', ')}</Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <StyledButton
                          onClick={() => handleJobApply(job._id)}
                          variant="contained"
                        >
                          Apply Now
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

          {/* Pagination */}
          <Stack spacing={2} sx={{ margin: '50px 0' }}>
            <Pagination
              count={Math.ceil(totalJobs / itemsPerPage)}
              page={page}
              color='primary'
              onChange={(event, value) => setPage(value)}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>

        </Box>
      </Box>
    </>
  );
};

export default FindJobPosts;
