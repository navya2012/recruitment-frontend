import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllAppliedJobPostsPostedByEmployer } from '../../../../api\'s/employerApi\'s';
import { Box, Card, CardContent, CardHeader, Avatar, Typography, Grid, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';

const JobAppliedApplications = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await dispatch(getAllAppliedJobPostsPostedByEmployer());
        setAppliedJobs(response?.data?.jobAppliedPostsList || []); 
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
  };
console.log(appliedJobs)
  return (
    <>
      <Typography variant="h4" sx={{ color: 'black', mb: 3 }}>
        All Applicants!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Ready to jump back in?
      </Typography>

      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <Grid container spacing={3}>
          {appliedJobs.length > 0 ? (
            appliedJobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, id) => (
              <Grid item xs={12} sm={12} md={6} lg={6} key={id}>
                <Card elevation={3} sx={{ borderRadius: '12px', padding: '16px' }}>
                  <CardHeader
                    avatar={<Avatar alt={data.firstName} src={data.profileImage || ''} sx={{ width: 56, height: 56 }} />}
                    title={<Typography variant="h6">{data.firstName} {data.lastName}</Typography>}
                    subheader={<Typography variant="body2" color="textSecondary">{data.email}</Typography>}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      Company: {data.companyName || '-'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Role: {data.role || '-'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Applied on: {data.jobAppliedDate ? formatDate(data.jobAppliedDate) : '-'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center', width: '100%' }}>
              No posts available
            </Typography>
          )}
        </Grid>
      </Box>

      {/* Pagination */}
      {appliedJobs.length > 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(appliedJobs.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default JobAppliedApplications;
