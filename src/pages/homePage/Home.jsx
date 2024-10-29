import React from 'react'
import { Box } from '@mui/material'
import BannerSection from './components/BannerSection'
import JobSearchContent from './components/JobSearchContent'
import BuildResumeContent from './components/BuildResumeContent'
import NewsLetter from './components/NewsLetter'
import Business from './components/Business'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'


const Home = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ paddingTop: '4%' ,backgroundColor: '#F0F5F7',}}>
        <BannerSection />
        <Box sx={{  padding: { xs: '10px', md: '20px 90px' } }}>
          <JobSearchContent />
          <BuildResumeContent />
          <Business />
        </Box>
        <NewsLetter />
      </Box>
      <Footer />
    </>
  )
}

export default Home