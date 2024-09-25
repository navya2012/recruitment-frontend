import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllAppliedJobPostsByEmployee } from '../../../api\'s/employeeApi\'s';
import { Box, CardContent, Grid, Typography, styled, Chip, Card } from '@mui/material';

// Styled components
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
  fontSize: '15px'
}));

const AppliedJobPostsList = () => {
  const [appliedJobsList, setAppliedJobsList] = useState([]);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await dispatch(getAllAppliedJobPostsByEmployee());
           if (response.data.jobAppliedPostsList && response.data.jobAppliedPostsList.length > 0) {
          setAppliedJobsList(response.data.jobAppliedPostsList);
        } else if (response.data.message) {
          setMessage(response.data.message); 
        }
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 0' }}>
      <Box sx={{ padding: '0 50px', margin: '0 auto' }}>

        <Typography variant="h4" sx={{ paddingBottom: '40px', textAlign: 'center' }} fontWeight="bold">
          Applied Job Posts
        </Typography>

        <Grid container spacing={3}>
          {appliedJobsList.length > 0 ? (
            appliedJobsList.map((job) => {
              // Format the job applied date
              const formattedDate = new Date(job.jobAppliedDate).toLocaleDateString();

              return (
                <Grid item xs={12} sm={6} md={4} key={job._id}>
                  <StyledCard>
                    <CardContent>
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '25px', marginRight: { xs: '10px', sm: '0' } }}>
                            {job.companyName}
                          </Typography>
                          <TagChip label={formattedDate} />
                        </Box>

                        <Typography variant="subtitle1" sx={{ margin: '10px 0', fontSize: '18px' }}>
                          {job.role}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                          <TagChip label={job.technologies} />
                          <TagChip label={job.experience} />
                          <TagChip label={job.location} />
                        </Box>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>

              );
            })
          ) : (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                padding:'50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
               <Typography variant="h5" sx={{ textTransform: 'uppercase', textAlign: 'center',color:'black' }}>
                {message || 'No applied job posts found'}
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default AppliedJobPostsList;
