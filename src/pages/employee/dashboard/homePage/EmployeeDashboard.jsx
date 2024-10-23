import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, ListItemIcon, Paper } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { BarChart } from '@mui/x-charts/BarChart';
import { getAllAppliedJobsByEmployee } from '../../../../api\'s/employeeApi\'s';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [loading, setLoading] = useState(true);
  const { allAppliedJobs } = useSelector((state) => state?.employeeReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(getAllAppliedJobsByEmployee(navigate));
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: '#F0F5F7', p: 3 }}>
      <Typography variant="h4" sx={{  mb: 3 }}>
        Dashboard Home!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 ,color:'#0557A2' }}>
        Ready to jump back in?
      </Typography>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px' }}>
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
                padding: '40px',
              }}
            >
              <ListItemIcon>
                <TextSnippetIcon
                  sx={{
                    textAlign: 'center',
                    backgroundColor: '#d930251a',
                    width: '70px',
                    height: '70px',
                    borderRadius: '8px',
                    fontSize: '30px',
                    color: '#d93025',
                    padding: '10px',
                  }}
                />
              </ListItemIcon>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: { xs: 'center', md: 'flex-end' },
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h4" sx={{ color: '#d93025', fontWeight: 600 }}>
                  {allAppliedJobs?.length > 0 ? allAppliedJobs.length : 0}
                </Typography>
                <Typography variant="body1" sx={{ color:'#0557A2' , fontWeight: 500 }}>
                  Applied Jobs
                </Typography>
              </Box>
            </Paper>
          </Box>
          {/* Bar Chart for Applied Jobs */}
          <Paper elevation={2} sx={{ margin: '30px 0', width: '40%', paddingTop: '30px',  borderRadius: '10px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
              <BarChart
                xAxis={[
                  {
                    scaleType: 'band',
                    data: ['Applied Jobs'],
                  },
                ]}
                series={[
                  {
                    data: [allAppliedJobs?.length > 0 ? allAppliedJobs.length : 0],
                    label: 'Applied Jobs',
                    color: '#d32f2f'
                  },
                ]}
                width={350}
                height={250}
              />
            </Box>
          </Paper>
        </>
      )
      }
    </Box>
  );
};

export default EmployeeDashboard;
