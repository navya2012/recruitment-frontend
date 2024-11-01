import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner'
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllAppliedJobPostsPostedByEmployer } from '../../../../api\'s/employerApi\'s'


const ApplicationOutcomes = () => {
    const [loading, setLoading] = useState(false)
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const { jobAppliedUsers } = useSelector((state) => state?.employerReducer);
    console.log(jobAppliedUsers)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            await dispatch(getAllAppliedJobPostsPostedByEmployer( navigate));
          } catch (error) {
            throw new Error(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [dispatch, navigate]);

  return (
    <>
          <Typography variant="h4" sx={{ mb: 3 }}>
        Reviewed Applications!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#0557A2' }}>
        Ready to jump back in?
      </Typography>

      <Paper sx={{ padding: '30px', borderRadius: '10px' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Applications</Typography>

        {
          loading ? (
            <LoadingSpinner />
          ) : (
            <>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
        sx={{ width: '50%', '& .MuiTabs-indicator': { backgroundColor: '#0557A2' } }} 
      >
        <Tab 
          value="one" 
          label="Approved Applications" 
          sx={{ flex: 1, color: '#0557A2', '&.Mui-selected': { color: '#0557A2' } }} 
        />
        <Tab 
          value="two" 
          label="Rejected Applications" 
          sx={{ flex: 1, color: '#0557A2', '&.Mui-selected': { color: '#0557A2' } }}
        />
      </Tabs>
    </Box>
            </>
          )
        }
        </Paper>
    </>
  )
}

export default ApplicationOutcomes