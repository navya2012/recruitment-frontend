import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeFullDetails } from '../../../../api\'s/employeeApi\'s';
import { Avatar, Box, Button, Divider, Grid, Pagination, PaginationItem, Paper, styled, Typography } from '@mui/material';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {approveAppliedJobPostsByEmployer, rejectAppliedJobPostsByEmployer } from '../../../../api\'s/employerApi\'s'

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  width: '130px',
  backgroundColor: '#0557a2',
  color: '#fff',
  margin: '0',
}));


const AppliedEmployeeDetails = () => {
  const [loading, setLoading] = useState(false);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [page, setPage] = useState(1);
  
  const itemsPerPage = 6;

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userFullDetails = useSelector((state) => state.employeeReducer.employeeFullDetails);

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const employerId = userDetails?._id

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
  
   useEffect(() => {
    if (userFullDetails?.appliedJobs) {
      const filtered = userFullDetails.appliedJobs.filter((job) => job.employer_id === employerId);
      setFilteredApplications(filtered);
    }
  }, [userFullDetails, employerId]);

  //pagination
  const totalAppliedJobs = filteredApplications?.length;
  const appliedJobsToDisplay = filteredApplications?.slice((page - 1) * itemsPerPage, page * itemsPerPage);


  const handleApproveAppliedJobPosts = (employeeId,jobId) => {
    const fetchData = async () => {
      try {
        await dispatch(approveAppliedJobPostsByEmployer(employeeId,jobId, navigate));
        setFilteredApplications((prev) =>
          prev.map((job) =>
            job.jobId === jobId ? { ...job, jobStatus: 'Approved' } : job
          )
        );
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchData();
  }

  const handleRejectedAppliedJobPosts = (employeeId, jobId) => {
    const fetchData = async () => {
      try {
        await dispatch(rejectAppliedJobPostsByEmployer(employeeId, jobId, navigate));
        setFilteredApplications((prev) =>
          prev.map((job) =>
            job.jobId === jobId ? { ...job, jobStatus: 'Rejected' } : job
          )
        );
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchData();
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Candidates Details!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#0557A2' }}>
        Ready to jump back in?
      </Typography>

      <Paper sx={{ padding: '30px', borderRadius: '10px' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>User Information</Typography>

        {
          loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" padding="40px 0">
                <Avatar
                  alt=""
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
                  {userFullDetails.userDetails?.firstName || "_"}
                  {userFullDetails.userDetails?.lastName || "_"}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
                  {userFullDetails.userDetails?.position || "_"}
                </Typography>
              </Box>

              <Divider sx={{ margin: '10px 0' }} />

              <Box sx={{ padding: '30px 60px' }}>
                <Typography variant="h5" sx={{ fontSize: '30px', mb: 6 }}>Personal Information :</Typography>

                <Grid container spacing={4} sx={{ padding: '0 40px' }}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                      <PhoneIcon sx={{ marginRight: 1, fontSize: '28px' }} /> Mobile Number :
                    </Typography>
                    <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom: '20px' }}>
                      {userFullDetails.userDetails?.mobileNumber || "_"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                      <EmailIcon sx={{ marginRight: 1, fontSize: '28px' }} /> Email :
                    </Typography>
                    <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom: '20px' }}>
                      {userFullDetails.userDetails?.email || "_"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                      <LocationOnIcon sx={{ marginRight: 1, fontSize: '28px' }} /> Location :
                    </Typography>
                    <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom: '20px' }}>
                      {userFullDetails.userDetails?.location || "_"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                      <WorkIcon sx={{ marginRight: 1, fontSize: '28px' }} /> Current Company :
                    </Typography>
                    <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom: '20px' }}>
                      {userFullDetails.userDetails?.currentCompany || "_"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                      <SchoolIcon sx={{ marginRight: 1, fontSize: '28px' }} /> Education Level :
                    </Typography>
                    <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom: '20px' }}>
                      {userFullDetails.workingExperience?.graduation || "_"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ margin: '10px 0' }} />

              <Box sx={{ padding: '30px 60px' }}>
                <Typography variant="h5" sx={{ mb: 4, fontSize: '30px' }}>Working Experience :</Typography>

                <Grid container spacing={4} sx={{ padding: '0 40px ' }}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                      <CodeIcon sx={{ marginRight: 1, fontSize: '28px' }} /> Professional Skills :
                    </Typography>
                    <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom: '20px' }}>
                      {userFullDetails.workingExperience?.technologies || "_"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                      <WorkIcon sx={{ marginRight: 1, fontSize: '28px' }} /> Experience :
                    </Typography>
                    <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom: '20px' }}>
                      {userFullDetails.workingExperience?.experience || "_"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                      <LanguageIcon sx={{ marginRight: 1, fontSize: '28px' }} /> Languages :
                    </Typography>
                    <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom: '20px' }}>
                      {userFullDetails.workingExperience?.languages || "_"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                      <LocationOnIcon sx={{ marginRight: 1, fontSize: '28px' }} /> Location :
                    </Typography>
                    <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom: '20px' }}>
                      {userFullDetails.workingExperience?.location || "_"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom>
                      <QueryBuilderIcon sx={{ marginRight: 1, fontSize: '28px' }} /> Notice Period :
                    </Typography>
                    <Typography variant="body1" sx={{ marginLeft: 5, paddingBottom: '20px' }}>
                      {userFullDetails.workingExperience?.noticePeriod || "_"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ margin: '10px 0' }} />

              <Box sx={{ padding: '30px 60px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="15px 0">
                  <Typography variant="h5" sx={{ mb: 4, fontSize: '30px' }}>Applied Jobs</Typography>
                  <Typography variant="body2" sx={{ mb: 4, fontSize: '22px' }}>{filteredApplications?.length} Applied Jobs</Typography>
                </Box>

                {
                  appliedJobsToDisplay.length > 0 ? (
                    appliedJobsToDisplay.map((job) => (
                      <>
                        <Box key={job.id} display="flex" justifyContent="space-between" alignItems="center" gap="50px" sx={{ mb: 3 }}>

                          <Box flex="1" sx={{ padding: '20px' }}>
                            <Typography variant="h6" fontWeight="bold">
                              {job.companyName}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ my: 2, fontSize: '18px' }}>
                              {job.role}
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '15px' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CodeIcon sx={{ marginRight: '8px' }} />
                                <Typography>
                                  {Array.isArray(job.technologies) && job.technologies.length > 0 ? job.technologies.join(', ') : job.technologies || 'N/A'}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <WorkIcon sx={{ marginRight: '8px' }} />
                                <Typography>{job.experience}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOnIcon sx={{ marginRight: '8px' }} />
                                <Typography>{job.location}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SchoolIcon sx={{ marginRight: '8px' }} />
                                <Typography>{job.graduation}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LanguageIcon sx={{ marginRight: '8px' }} />
                                <Typography>{Array.isArray(job.languages) && job.languages.length > 0 ? job.languages.join(', ') : job.languages || 'N/A'}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="h6">
                              Status:
                              <Box component="span" sx={{
                                color: job.jobStatus === 'Approved' ? 'green' :
                                  job.jobStatus === 'Rejected' ? 'red' : '#0557a2',
                                fontWeight: 'bold',
                                marginLeft: '8px'
                              }}>
                                {job.jobStatus}
                              </Box>
                            </Typography>
                          </Box>

                          <Box display="flex" flexDirection="column" gap="15px" justifyContent="flex-start" alignItems='center' >
                            <StyledButton variant="contained" onClick={()=> handleApproveAppliedJobPosts( job.employee_id,job.jobId,)}>Approve</StyledButton>
                            <StyledButton variant="contained" onClick={()=> handleRejectedAppliedJobPosts( job.employee_id,job.jobId,)}>Reject</StyledButton>
                          </Box>
                        </Box>
                        <Divider sx={{ margin: '15px 0' }} />
                      </>
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ textAlign: 'center', padding: '20px', color: '#555' }}>
                      No job applications found.
                    </Typography>
                  )
                }

<Box sx={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}>
              <Pagination
                count={Math.ceil(totalAppliedJobs / itemsPerPage)}
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
            </Box>
              </Box>

            </>
          )}
      </Paper>
    </>
  );
};


export default AppliedEmployeeDetails;
