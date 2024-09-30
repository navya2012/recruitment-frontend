import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box >
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}

export default Layout