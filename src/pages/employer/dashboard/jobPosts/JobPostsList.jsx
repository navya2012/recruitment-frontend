import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Pagination, Stack, IconButton, PaginationItem, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJobPostsData, getAllJobPostsPostedByEmployer } from '../../../../api\'s/employerApi\'s';
import { getAllJobPostsAppliedByAllEmployees } from '../../../../api\'s/employeeApi\'s';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';

const JobPostsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)

  const { jobPosts } = useSelector((state) => state?.employerReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          dispatch(getAllJobPostsPostedByEmployer()),
          dispatch(getAllJobPostsAppliedByAllEmployees())
        ]);
      } catch (error) {
        throw new Error(error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = (jobId) => {
    dispatch(deleteJobPostsData(jobId));
  };

  const handleEdit = (jobData) => {
    if (jobData?._id) {
      navigate(`/employer-dashboard/edit-jobs/${jobData._id}`);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const isJobPostsValid = Array.isArray(jobPosts) && jobPosts.length > 0;
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentJobPosts = isJobPostsValid ? jobPosts.slice(indexOfFirstPost, indexOfLastPost) : [];

  // Calculate the display range for the jobs
  const totalJobs = jobPosts?.length;
  const firstJob = indexOfFirstPost + 1;
  const lastJob = Math.min(indexOfLastPost, totalJobs);
  return (
    <>
      <Typography variant="h4" sx={{ color: 'black', mb: 3 }}>
        Manage jobs!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Ready to jump back in?
      </Typography>

      <Paper sx={{ padding: '40px', borderRadius: '10px' }}>
        <Typography variant='h5' sx={{ color: 'black', mb: 4 }}>My Job Listings</Typography>

        {
          loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Typography variant='body1' sx={{ mb: 4 }}>
                {totalJobs > 0 ? ` show ${firstJob} - ${lastJob} of ${totalJobs} jobs` : ""}
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#F5F7FC' }}>
                      <TableCell sx={{ color: '#3A73D3', fontSize: '17px' }}><strong>Company Name</strong></TableCell>
                      <TableCell sx={{ color: '#3A73D3', fontSize: '17px' }}><strong>Role</strong></TableCell>
                      <TableCell sx={{ color: '#3A73D3', fontSize: '17px' }}><strong>Technologies</strong></TableCell>
                      <TableCell sx={{ color: '#3A73D3', fontSize: '17px' }}><strong>Created</strong></TableCell>
                      <TableCell sx={{ color: '#3A73D3', fontSize: '17px', textAlign: 'center' }}><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentJobPosts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} sx={{ textAlign: 'center' }}>
                          No job posts available
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentJobPosts &&
                      currentJobPosts.map((job) => {
                        const formattedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        });
                        return (
                          <TableRow key={job._id}>
                            <TableCell>
                              <Typography variant="h6">{job.companyName}</Typography>
                              <Box display='flex' alignItems="flex-start" justifyContent='flex-start' gap='10px' sx={{ padding: '10px 0', flexDirection: { xs: 'column', md: 'row' } }}>
                                <Box display="flex" alignItems="center" justifyContent='center' sx={{ mb: 1 }}>
                                  <WorkOutlineIcon sx={{ mr: 1 }} />
                                  <Typography variant="body2">{job.experience}</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent='center'>
                                  <LocationOnIcon sx={{ mr: 1 }} />
                                  <Typography variant="body2" color="textSecondary">
                                    {job.location}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{job.role}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {job.technologies}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="green">{formattedDate}</Typography>
                            </TableCell>
                            <TableCell>
                              <Box display="flex" gap={1}>
                                <Tooltip title="Edit Application" placement="top">
                                  <IconButton aria-label="edit" onClick={() => handleEdit(job)}>
                                    <EditIcon
                                      sx={{
                                        textAlign: "center", backgroundColor: '#1967d21a', width: '30px', height: '30px', borderRadius: '8px', fontSize: '22px', color: '#1967d2', padding: '6px'
                                      }}
                                    />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Application" placement="top">
                                  <IconButton aria-label="delete" onClick={() => handleDelete(job._id)}>
                                    <DeleteIcon
                                      sx={{
                                        textAlign: "center", backgroundColor: '#1967d21a', width: '30px', height: '30px', borderRadius: '8px', fontSize: '22px', color: '#1967d2', padding: '6px'
                                      }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              {jobPosts && (
                <Stack spacing={2} sx={{ padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
                  <Pagination
                    count={Math.ceil(jobPosts.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color='primary'
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                      />
                    )}
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

export default JobPostsList;
