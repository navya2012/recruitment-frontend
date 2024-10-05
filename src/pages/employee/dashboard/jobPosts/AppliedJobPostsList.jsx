import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppliedJobPostsByEmployee } from '../../../../api\'s/employeeApi\'s';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';

const AppliedJobPostsList = () => {
  const { appliedJobPosts } = useSelector((state) => state?.employeeReducer);
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    dispatch(getAllAppliedJobPostsByEmployee());
  }, [dispatch]);

  // Pagination logic
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = appliedJobPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(appliedJobPosts.length / itemsPerPage);

  // Calculate range for the message
  const totalJobs = appliedJobPosts.length;
  const start = totalJobs > 0 ? indexOfFirstPost + 1 : 0;
  const end = totalJobs > 0 ? Math.min(indexOfLastPost, totalJobs) : 0;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Typography variant="h4" sx={{ color: 'black', mb: 3 }}>
        My Applied Jobs
      </Typography>

      <Typography variant="body2" sx={{ mb: 3 }}>
        Ready to jump back in?
      </Typography>

      <Paper sx={{ padding: '40px', borderRadius: '10px' }}>
        <Typography variant='h5' sx={{ color: 'black', mb: 4 }}>My Applied Jobs</Typography>

        {/* Show the range message */}
        <Typography variant="body1" sx={{ fontWeight:'bold', mb: 3 }}>
          {totalJobs > 0 ? `Show ${start} - ${end} of ${totalJobs} jobs` : 'No jobs found'}
        </Typography>

        {currentPosts.length > 0 ? (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="applied jobs table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#F5F7FC' }}>
                    <TableCell sx={{ color: '#3A73D3', fontWeight: 'bold', fontSize:'17px' }}>Company Name</TableCell>
                    <TableCell sx={{ color: '#3A73D3', fontWeight: 'bold',fontSize:'17px' }}>Job Title</TableCell>
                    <TableCell sx={{ color: '#3A73D3', fontWeight: 'bold',fontSize:'17px' }}>Date Applied</TableCell>
                    <TableCell sx={{ color: '#3A73D3', fontWeight: 'bold',fontSize:'17px' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentPosts.map((job) => {
                    const formattedDate = new Date(job.employee_jobAppliedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                    return (
                      <TableRow key={job._id}>
                        <TableCell><Typography variant="body1">{job.companyName}</Typography></TableCell>
                        <TableCell><Typography variant="body1">{job.role}</Typography></TableCell>
                        <TableCell><Typography variant="body1">{formattedDate}</Typography></TableCell>
                        <TableCell><Typography variant="body1">{job.hasApplied ? "Applied" : "Pending"}</Typography></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        ) : (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              padding: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" sx={{ textTransform: 'uppercase', textAlign: 'center', color: 'black' }}>
              No applied job posts found
            </Typography>
          </Box>
        )}
      </Paper>
    </>
  );
};

export default AppliedJobPostsList;
