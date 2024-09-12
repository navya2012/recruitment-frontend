import React, { useEffect } from 'react'
import { getAllJobPostsAppliedByEmployees, getAllJobPostsData, JobAppliedPostsStatus } from '../../../api\'s/employeeApi\'s'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, CardContent, Grid, Paper, styled, Typography } from '@mui/material'


const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '20px 30px',
  margin: '0',
  textTransform: 'none',
  width: '20%'
}));

const JobPostsData = () => {
  const { allJobPosts, jobAppliedPosts } = useSelector((state) => state.employeeReducer)
  const currentEmployeeId = useSelector((state) => state.authReducer.userData._id);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllJobPostsData())
    dispatch(getAllJobPostsAppliedByEmployees())
  }, [dispatch])

  const handleJobApply = async (jobId) => {
    try {
      await dispatch(JobAppliedPostsStatus(jobId))
      dispatch(getAllJobPostsAppliedByEmployees());
    }

    catch (error) {
      throw new Error(error.message)
    }
  }
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ width: '100%', padding: '60px 0' }}>
          <Box sx={{ padding: '0 80px', margin: '0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '30px' }}>
              <Typography variant="h4">Job Posts</Typography>
            </Box>
            <Grid container spacing={3}>
              {allJobPosts.length > 0 ? (
                allJobPosts.map((job) => (
                  <Grid item xs={12} key={job._id}>
                    <Card sx={{ padding: '30px' }}>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1">
                              <strong>Company Name:</strong> {job.companyName}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1">
                              <strong>Role:</strong> {job.role}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1">
                              <strong>Technologies:</strong> {job.technologies}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1">
                              <strong>Experience:</strong> {job.experience}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1">
                              <strong>Location:</strong> {job.location}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1">
                              <strong>Graduation:</strong> {job.graduation}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1">
                              <strong>Languages:</strong> {job.languages}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1">
                              <strong>Notice Period:</strong> {job.noticePeriod}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <StyledButton
                                type="submit"
                                onClick={() => handleJobApply(job._id)}
                                variant="contained"
                                disabled={jobAppliedPosts.some((post) => post.jobId === job._id && post.employee_id === currentEmployeeId)}
                              >
                                {jobAppliedPosts.some((post) => post.jobId === job._id && post.employee_id === currentEmployeeId)
                                  ? 'Applied'
                                  : 'Apply'}
                              </StyledButton>
                            </Box>
                          </Grid>

                        </Grid>
                      </CardContent>
                    </Card>
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
  )
}

export default JobPostsData

