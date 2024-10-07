import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, PaginationItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppliedJobPostsByEmployee } from '../../../../api\'s/employeeApi\'s';

const AppliedJobs = () => {
  console.log('applied jobs component')
  const { appliedJobs } = useSelector((state) => state?.employeeReducer);
  console.log(appliedJobs)

  const dispatch = useDispatch();

  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
console.log('jobs....')
  useEffect(() => {
    console.log('jobs fdfeds....')
    dispatch(getAllAppliedJobPostsByEmployee());
    console.log('jobs feeeeeeeeeeeeee....')
  }, [dispatch]);
  console.log('jobs xxxxxxxxxxxxxxx....')

  // Pagination logic
  const totalAppliedJobs = appliedJobs.length;
  const appliedJobsToDisplay = appliedJobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
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
          Show {appliedJobsToDisplay.length} of {totalAppliedJobs} jobs
        </Typography>

        {appliedJobsToDisplay.length > 0 ? (
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
                  {appliedJobsToDisplay.map((job) => {
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

      </Paper>
    </>
  );
};

export default AppliedJobs;
