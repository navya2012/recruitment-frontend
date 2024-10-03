import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React from 'react'
import Navbar from '../navbar/Navbar'
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const drawerWidth = 250

const menuList = [
  {
    menuItem: 'Dashboard',
    path: '/employer-dashboard/home',
    icon: <HomeIcon />
  },
  {
    menuItem: 'Post A New Job',
    path: '/employer-dashboard/add-new-jobs',
    icon: <PostAddIcon />
  },
  {
    menuItem: 'Manage Jobs',
    path: '/employer-dashboard/manage-jobs',
    icon: <ManageSearchIcon />
  },
  {
    menuItem: 'All Applications',
    path: '/employer-dashboard/applied-job-posts',
    icon: <AssignmentIcon />
  },
  {
    menuItem: 'View Profile',
    path: '/employer-dashboard/profile-details',
    icon: <AccountCircleIcon />
  },
  {
    menuItem: 'Change Password',
    path: '/employer-dashboard/change-password',
    icon: <LockIcon />
  },
  {
    menuItem: 'Logout',
    path: '/login',
    icon: <ExitToAppIcon />
  }
];

const SideBar = () => {
  return (
    <>
     <Box sx={{ display: 'flex' }}>
     <CssBaseline />
     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
     <Navbar/>
        </AppBar>
    
     <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', paddingTop:'50px' }}>
          <List>
          {menuList.length > 0 ? (
              menuList.map(({ menuItem, path, icon }, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton component={Link} to={path || '#'}>
                    <ListItemIcon>
                      {icon || <div style={{ width: 24, height: 24 }} />} 
                    </ListItemIcon>
                    <ListItemText primary={menuItem || 'No Menu Item'} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No menu items available" />
              </ListItem>
            )}
          </List>
          </Box>
          </Drawer>
     </Box>
    </>
  )
}

export default SideBar