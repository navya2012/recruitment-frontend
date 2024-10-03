import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Paper, styled, Typography, Chip, Stack, Pagination, PaginationItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJobPostsData, getAllJobPostsPostedByEmployer } from '../../../../api\'s/employerApi\'s';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


// Styled button
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  width: '150px',
  backgroundColor: '#000',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#333',
  },
}));

// Styled card for job posts
const StyledCard = styled(Card)(({ theme }) => ({
  padding: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  border: '2px solid #0557A2',
  borderRadius: '15px',
}));

const TagChip = styled(Chip)(({ theme }) => ({
  borderRadius: '10px',
  marginRight: '10px',
  fontWeight: 'bold',
  fontSize: '15px',
}));

const JobPosts = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateJobPosts, setUpdateJobPosts] = useState({
    companyName: '',
    role: '',
    technologies: '',
    experience: '',
    graduation: '',
    location: '',
    languages: '',
    noticePeriod: ''
  });

  const { jobPosts } = useSelector((state) => state.employerReducer);
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Set number of items per page

  useEffect(() => {
    dispatch(getAllJobPostsPostedByEmployer());
  }, [dispatch]);

  const handleAddData = () => {
    setIsEditing(false);
  };

  const handleDelete = (jobId) => {
    dispatch(deleteJobPostsData(jobId));
  };

  const handleEdit = (jobData) => {
    setIsEditing(true);
    setUpdateJobPosts({
      _id: jobData._id,
      companyName: jobData.companyName,
      role: jobData.role,
      technologies: jobData.technologies,
      experience: jobData.experience,
      graduation: jobData.graduation,
      location: jobData.location,
      languages: jobData.languages,
      noticePeriod: jobData.noticePeriod
    });
  };



  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate current job posts to display
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentJobPosts = jobPosts?.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <Typography variant="h4" sx={{ color: 'black', mb: 3 }}>
        Manage jobs!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Ready to jump back in?
      </Typography>


      <Paper sx={{ padding: '30px', borderRadius: '10px' }}>
      <Typography variant="h5" sx={{ color: 'black', mb: 3 }}>
      My Job Listings
      </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ width: '100%' }}>
          <Box sx={{ padding: '50px', margin: '0 auto' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: { xs: 'center', sm: 'space-between' },
                alignItems: 'center',
                paddingBottom: '20px',
                gap: { xs: '15px', sm: '50px' },
              }}
            >
              <Typography variant="h4" fontWeight="bold">Job Posts</Typography>
              <StyledButton onClick={handleAddData} type="submit" variant="contained">
                Add Job Post
              </StyledButton>
            </Box>

            {currentJobPosts?.length === 0 ? (
              <Typography variant="h5" sx={{ textAlign: 'center', textTransform: 'uppercase', paddingTop: '20px' }}>
                No posts found.
              </Typography>
            ) : (
              <Grid container spacing={3}>
                {currentJobPosts.map((job) => (
                  <Grid item xs={12} sm={6} md={4} key={job._id}>
                    <StyledCard>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '25px' }}>
                          {job.companyName}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ margin: '15px 0', fontSize: '18px' }}>
                          {job.role}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          <TagChip label={job.technologies} />
                          <TagChip label={job.experience} />
                          <TagChip label={job.graduation} />
                          <TagChip label={job.location} />
                          <TagChip label={job.languages} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginTop: '20px' }}>
                          <StyledButton onClick={() => handleEdit(job)} variant="contained">Edit</StyledButton>
                          <StyledButton onClick={() => handleDelete(job._id)} variant="contained">Delete</StyledButton>
                        </Box>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          {/* Pagination component */}
          {jobPosts && (
            <Stack spacing={2} sx={{ padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
              <Pagination
                count={Math.ceil(jobPosts.length / itemsPerPage)} // Calculate total pages
                page={currentPage} // Current page
                onChange={handlePageChange} // Handle page change
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                  />
                )}
              />
            </Stack>
          )}


        </Paper>
      </Box>
    </>
  );
};

export default JobPosts;



