import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Modal, Paper, styled, Typography, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import JobPostsForm from './JobPostsForm';
import JobPostsUpdateForm from './JobPostsUpdateForm';
import { deleteJobPostsData, getAllJobPostsPostedByEmployer } from '../../../api\'s/employerApi\'s';

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
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    dispatch(getAllJobPostsPostedByEmployer());
  }, [dispatch]);

  const handleAddData = () => {
    setIsEditing(false);
    setOpen(true);
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return ( 
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

          {jobPosts.length === 0 ? (
            <Typography variant="h5" sx={{ textAlign: 'center', textTransform: 'uppercase', paddingTop: '20px' }}>
              No posts found.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {jobPosts.map((job) => (
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

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap:'20px', marginTop: '20px' }}>
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
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-profile-modal-title"
        aria-describedby="edit-profile-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: 24,
          width: '90%',
          maxWidth: '750px'
        }}>
          {isEditing ? (
            <JobPostsUpdateForm handleClose={handleClose} setOpen={setOpen} updateJobPosts={updateJobPosts} setUpdateJobPosts={setUpdateJobPosts} />
          ) : (
            <JobPostsForm handleClose={handleClose} setOpen={setOpen} />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default JobPosts;
