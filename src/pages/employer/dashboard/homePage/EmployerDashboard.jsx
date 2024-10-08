import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, ListItemIcon, Paper } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { getAllJobPostsPostedByEmployer, getAllAppliedJobPostsPostedByEmployer } from '../../../../api\'s/employerApi\'s';

const EmployerDashboard = () => {
  const [loading, setLoading] = useState(true);

  const { jobPosts, jobAppliedUsers } = useSelector((state) => state?.employerReducer);

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          dispatch(getAllJobPostsPostedByEmployer()),
          dispatch(getAllAppliedJobPostsPostedByEmployer())
        ]);
      } catch (error) {
        throw new Error(error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#F0F5F7', p: 3 }}>
        <Typography variant="h4" sx={{ color: 'black', mb: 3 }}>
          Dashboard Home!
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Ready to jump back in?
        </Typography>

        {
          loading ? (
            <LoadingSpinner />
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                flexDirection: { xs: 'column', md: 'row' }
              }}
            >
              <Paper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'white',
                  borderRadius: '8px',
                  textAlign: 'center',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 5,
                  padding: '40px'
                }}
              >
                <ListItemIcon>
                  <BusinessCenterOutlinedIcon
                    sx={{
                      textAlign: "center",
                      backgroundColor: '#1967d21a',
                      width: '70px',
                      height: '70px',
                      borderRadius: '8px',
                      fontSize: '30px',
                      color: '#1967d2',
                      padding: '10px'
                    }}
                  />
                </ListItemIcon>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: { xs: 'center', md: 'flex-end' },
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#1890ff', fontWeight: 600 }}>
                    {jobPosts ? jobPosts.length : 0}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#595959', fontWeight: 500 }}>
                    Posted Jobs
                  </Typography>
                </Box>
              </Paper>

              <Paper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'white',
                  borderRadius: '8px',
                  textAlign: 'center',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 5,
                  padding: '40px'
                }}
              >
                <ListItemIcon>
                  <TextSnippetIcon
                    sx={{
                      textAlign: "center",
                      backgroundColor: '#d930251a',
                      width: '70px',
                      height: '70px',
                      borderRadius: '8px',
                      fontSize: '30px',
                      color: '#d93025',
                      padding: '10px'
                    }}
                  />
                </ListItemIcon>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: { xs: 'center', md: 'flex-end' },
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#d93025', fontWeight: 600 }}>
                    {jobAppliedUsers ? jobAppliedUsers.length : 0}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#595959', fontWeight: 500 }}>
                    Applications
                  </Typography>
                </Box>
              </Paper>
            </Box>
          )
        }
      </Box>
    </>
  );
};

export default EmployerDashboard;
