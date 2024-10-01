import { Box } from '@mui/material'
import React from 'react'
import JobsHeader from './components/JobsHeader'
import FindJobPosts from './components/FindJobPosts'

const JobsPage = () => {
  return (
    <>
    <Box sx={{ backgroundColor: '#F0F5F7'}}>
      <JobsHeader />
      <Box sx={{ padding: { xs: '10px', md: '20px 90px' } }}>
        <FindJobPosts />
      </Box>
      </Box>
    </>
  )
}

export default JobsPage