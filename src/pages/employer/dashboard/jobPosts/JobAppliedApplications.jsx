import React, { useEffect, useState } from 'react';
import { Box, Paper, Grid, Typography, Avatar, Pagination, Stack } from "@mui/material";
import { styled } from "@mui/system";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppliedJobPostsPostedByEmployer } from '../../../../api\'s/employerApi\'s'; // Ensure the correct import path
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';


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
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  
  const { jobAppliedUsers } = useSelector((state) => state?.employerReducer);

  const itemsPerPage = 6;

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(getAllAppliedJobPostsPostedByEmployer(currentPage, itemsPerPage, navigate));
      } catch (error) {
        throw new Error(error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentPage, itemsPerPage, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const isArray = Array.isArray(jobAppliedUsers);
  const hasApplicants = isArray && jobAppliedUsers.length > 0;

  // Calculate pagination indices
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentJobPosts = hasApplicants ? jobAppliedUsers.slice(indexOfFirstPost, indexOfLastPost) : [];

  // Pagination total
  const totalJobs = jobAppliedUsers?.length;

  return (
    <>
      <Typography variant="h4" sx={{  mb: 3 }}>
        All Applicants!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 , color:'#0557A2'}}>
        Ready to jump back in?
      </Typography>

      <Paper sx={{ padding: '30px', borderRadius: '10px' }}>
        <Typography variant='h5' sx={{  mb: 3 }}>Applicant</Typography>

        {
          loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Typography variant='h6' sx={{ mb: 3 , color:'#0557A2'}}>
                {hasApplicants ? ` show ${indexOfFirstPost + 1} - ${Math.min(indexOfLastPost, totalJobs)} of ${totalJobs} jobs` : "0 jobs"}
              </Typography>

              <Grid container spacing={3}>
                {hasApplicants ? (
                  currentJobPosts.map((data, id) => (
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
                )}
              </Grid>

              {/* Pagination */}
              {totalJobs > 0 && (
                <Stack spacing={2} sx={{ padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
                  <Pagination
                    count={Math.ceil(totalJobs / itemsPerPage)}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color='primary'
                  />
                </Stack>
              )}
            </>
          )
        }
      </Paper>
    </>
  );
};

export default JobAppliedApplications;
