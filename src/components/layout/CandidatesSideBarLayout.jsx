import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideBar from '../sidebar/SideBar';
import { useSideBarContextData } from '../../context/SideBarProvider';
import SidebarFooter from '../footer/SidebarFooter';


const CandidatesSidebarLayout = () => {
    const {candidateMenuList} = useSideBarContextData()
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <SideBar menuItems={candidateMenuList} />
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
        <Box sx={{ flexGrow: 1, padding: '150px 50px 80px 50px' }}>
          <Outlet />
        </Box>
        <SidebarFooter/>
      </Box>
    </Box>
  );
};

export default CandidatesSidebarLayout;
