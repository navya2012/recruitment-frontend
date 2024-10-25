import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ paddingTop: '155px' }}>
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout