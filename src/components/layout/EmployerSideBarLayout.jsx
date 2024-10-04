import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideBar from '../sidebar/SideBar';
import { useSideBarContextData } from '../../context/SideBarProvider';


const EmployerSidebarLayout = () => {
  const {employerMenuList} = useSideBarContextData()
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <SideBar menuItems={employerMenuList} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          padding: '150px 50px', 
          backgroundColor: '#F0F5F7', 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        <Outlet />
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default EmployerSidebarLayout;
