import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllAppliedJobPostsByEmployee } from '../../../api\'s/employeeApi\'s';
import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';

const AppliedJobPostsList = () => {
  const [appliedJobsList, setAppliedJobsList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await dispatch(getAllAppliedJobPostsByEmployee());
        setAppliedJobsList(response.data.jobAppliedPostsList);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: '1200px', padding: '40px' }}>
        <Box sx={{ padding: '0 20px', margin: '0 auto' }}>
          <Typography variant="h4" sx={{ paddingBottom: '20px', textAlign: 'center' }}>
            Applied Job Posts
          </Typography>
          <Grid container spacing={3}>
            {appliedJobsList.length > 0 ? (
              appliedJobsList.map((job) => (
                <Grid item xs={12} key={job._id}>
                  <Card sx={{ padding: '20px' }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        {/* First Row */}
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1">
                            <strong>Company Name:</strong> {job.companyName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1">
                            <strong>Role:</strong> {job.role}
                          </Typography>
                        </Grid>

                        {/* Second Row */}
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1">
                            <strong>Technologies:</strong> {job.technologies}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1">
                            <strong>Experience:</strong> {job.experience}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1">
                            <strong>Location:</strong> {job.location}
                          </Typography>
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
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5" sx={{ textTransform: 'uppercase', textAlign: 'center' }}>
                  No posts found.
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AppliedJobPostsList;
