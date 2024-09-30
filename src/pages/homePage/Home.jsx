import React from 'react'
import { Box } from '@mui/material'
import BannerSection from './components/BannerSection'
import JobSearchContent from './components/JobSearchContent'
import BuildResumeContent from './components/BuildResumeContent'
import NewsLetter from './components/NewsLetter'


const Home = () => {
  return (
   <>
 <Box sx={{ padding: { xs: '10px', md: '20px 90px' } }}>
  <BannerSection />
  <JobSearchContent />
  <BuildResumeContent />
</Box>
<Box>
  <NewsLetter />
</Box>

   </>
  )
}

export default Home