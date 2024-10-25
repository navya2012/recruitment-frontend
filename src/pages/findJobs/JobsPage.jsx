import { Box } from '@mui/material'
import React from 'react'
import JobsHeader from './components/JobsHeader'
import FindJobPosts from './components/FindJobPosts'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const JobsPage = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: '#F0F5F7', paddingTop:'65px' }}>
        <JobsHeader />
        <Box sx={{ padding: { xs: '10px', md: '20px 90px' } }}>
          <FindJobPosts />
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default JobsPage