import React, { useEffect, useState } from 'react';
import { Box, Paper, Grid, Typography, Avatar, Pagination, Stack, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAppliedJobPostsByEmployer, getAllAppliedJobPostsPostedByEmployer } from '../../../../api\'s/employerApi\'s';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const JobCard = styled(Paper)(({ theme }) => ({
  padding: ' 20px',
  borderRadius: '12px',
  textAlign: 'left',
  boxShadow: theme.shadows[3],
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  cursor: 'pointer',
  height:'100%',
  minHeight: '220px',
  overflow: 'visible',
}));

const JobAppliedApplications = () => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const { jobAppliedUsers } = useSelector((state) => state?.employerReducer);

  const itemsPerPage = 6;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(getAllAppliedJobPostsPostedByEmployer(currentPage, itemsPerPage, navigate));
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentPage, itemsPerPage, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };


  const isArray = Array.isArray(jobAppliedUsers);
  const hasApplicants = isArray && jobAppliedUsers.length > 0;

  const handleDeleteAppliedJobPosts = (employeeId,jobId) => {
    const fetchData = async () => {
      try {
        await dispatch(deleteAppliedJobPostsByEmployer(employeeId,jobId, navigate));
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchData();
  }

  // Calculate pagination indices
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentJobPosts = hasApplicants ? jobAppliedUsers.slice(indexOfFirstPost, indexOfLastPost) : [];

  // Pagination total
  const totalJobs = jobAppliedUsers?.length;

  const handleCardClick = (employeeId) => {
    navigate(`${employeeId}`);
  };

  const approvedCount = jobAppliedUsers?.filter(job => job.jobStatus === 'Approved').length
  const rejectedCount = jobAppliedUsers?.filter(job => job.jobStatus === 'Rejected').length
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        All Applicants!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#0557A2' }}>
        Ready to jump back in?
      </Typography>

      <Paper sx={{ padding: '30px', borderRadius: '10px' }}>
        <Typography variant='h4' sx={{ mb: 3 }}>Applicant</Typography>

        {
          loading ? (
            <LoadingSpinner />
          ) : (
            <>
            <Box display='flex' justifyContent='space-between' alignItems='center' width='100%' flexWrap='wrap' marginBottom='35px' backgroundColor='#F5F7FC' padding='20px 18px' borderRadius='10px'>
            <Typography variant='h6' sx={{ color: '#0557A2' }} >
                {hasApplicants ? `Show ${currentJobPosts.length} of ${totalJobs} jobs` : "0 jobs"}
              </Typography>

              <Box display='flex' alignItems='flex-start' gap='40px' flexWrap='wrap'>
        <Typography variant="h6">Total Applications: {totalJobs}</Typography>
        <Typography variant="h6" color="success.main">Approved: {approvedCount}</Typography>
        <Typography variant="h6" color="error.main">Rejected: {rejectedCount}</Typography>
              </Box>
            </Box>


              <Grid container spacing={3}>
                {
                  hasApplicants ? (
                    currentJobPosts.map((data, id) => (
                      <Grid item xs={12} sm={12} md={6} lg={4} key={id}>
                        <JobCard elevation={3} >
                          <Avatar
                            alt=''
                            src={data.employee_profileImage}
                            sx={{ width: 80, height: 80, marginRight: '20px' }}
                          />
                          <Box sx={{ textAlign: 'left', textTransform: 'capitalize' }}>
                            <Typography variant="h5" gutterBottom>
                              {data.employee_firstName || "-"} {data.employee_lastName || "-"}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                              {data.employee_position || "-"}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', paddingBottom: '10px' }} >
                              <LocationOnOutlinedIcon />
                              <Typography variant="body2" color="textSecondary" gutterBottom>
                                {data.employee_location || "-"}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary">
                              Applied on: {data.employee_jobAppliedDate ? formatDate(data.employee_jobAppliedDate) : "-"}
                            </Typography>

                            <Box display='flex' justifyContent='center' alignItems='center' gap='10px' flexWrap='wrap' padding='15px 0'>
                              <Tooltip title="View Application" placement="top" onClick={() => handleCardClick(data.employee_id)}>
                                < VisibilityOutlinedIcon
                                  sx={{
                                    textAlign: 'center',
                                    backgroundColor: 'rgb(233 236 239)',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '8px',
                                    fontSize: '30px',
                                    color: '#0557A2',
                                    padding: '8px',
                                  }}
                                />
                              </Tooltip>
                              <Tooltip title="Approve Application" placement="top" >
                                < CheckCircleIcon
                                  sx={{
                                    textAlign: 'center',
                                    backgroundColor: 'rgb(233 236 239)',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '8px',
                                    fontSize: '32px',
                                    fontWeight:'bold',
                                     color: data.jobStatus === 'Approved' ? 'darkgreen' : '#0557A2',
                                    padding: '8px',
                                  }}
                                />
                              </Tooltip>
                              <Tooltip title="Reject Application" placement="top">
                                < CancelOutlinedIcon
                                  sx={{
                                    textAlign: 'center',
                                    backgroundColor: 'rgb(233 236 239)',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '8px',
                                    fontSize: '30px',
                                    color: data.jobStatus === 'Rejected' ? 'red' : '#0557A2',
                                    padding: '8px',
                                  }}
                                />
                              </Tooltip>
                              <Tooltip title="Delete Application" placement="top" onClick={()=> handleDeleteAppliedJobPosts( data.employee_id,data.jobId,)}>
                                < DeleteForeverOutlinedIcon
                                  sx={{
                                    textAlign: 'center',
                                    backgroundColor: 'rgb(233 236 239)',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '8px',
                                    fontSize: '30px',
                                    color: '#0557A2',
                                    padding: '8px',
                                  }}
                                />
                              </Tooltip>
                            </Box>
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

