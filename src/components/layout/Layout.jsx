import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = () => {
  return (
    <>
        <Navbar/>
        <Box className="main-content">
        <Outlet />
        <Footer/>
      </Box>
    </>
  )
}

export default Layout