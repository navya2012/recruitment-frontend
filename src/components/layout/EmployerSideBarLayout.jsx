import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSideBarContextData } from '../../context/SideBarProvider';
import SidebarFooter from '../footer/SidebarFooter';
import SideBarLayout from '../sidebar/SideBarLayout';


const EmployerSidebarLayout = () => {
  const {employerMenuList} = useSideBarContextData()
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <SideBarLayout menuItems={employerMenuList} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,  
          backgroundColor: '#F0F5F7', 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        <Box sx={{ flexGrow: 1, padding: '100px 50px 50px 50px' }}>
          <Outlet />
        </Box>
        <SidebarFooter/>
      </Box>
    </Box>
  );
};

export default EmployerSidebarLayout;
