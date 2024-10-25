import React from 'react'
import { Box } from '@mui/material'
import BannerSection from '../../pages/homePage/components/BannerSection'
import JobSearchContent from '../../pages/homePage/components/JobSearchContent'
import NewsLetter from '../../pages/homePage/components/NewsLetter'




const MainPage = () => {
  return (
    <>
      <BannerSection />
      <Box sx={{ backgroundColor: '#F0F5F7', padding: { xs: '10px', md: '20px 90px' } }}>
        <JobSearchContent />
      </Box>
        <NewsLetter />
    </>
  )
}

export default MainPage