import React from 'react'
import { Box } from '@mui/material'
import BannerSection from './components/BannerSection'
import JobSearchContent from './components/JobSearchContent'
import BuildResumeContent from './components/BuildResumeContent'
import NewsLetter from './components/NewsLetter'
import Business from './components/Business'


const Home = () => {
  return (
    <>
      <Box sx={{backgroundColor:'#F0F5F7', padding: { xs: '10px', md: '20px 90px' } }}>
        <BannerSection />
        <JobSearchContent />
        <BuildResumeContent />
        <Business />
      </Box>
      <Box>
        <NewsLetter />
      </Box>

    </>
  )
}

export default Home