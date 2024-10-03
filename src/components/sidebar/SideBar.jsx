import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React from 'react'
import Navbar from '../navbar/Navbar'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';

const drawerWidth = 250

const menuList = [
    {
      menuItem: 'Dashboard',
      path: '/employer-dashboard/home',
      //icon: <AgricultureIcon />
    },
    {
      menuItem: 'Post A New Job',
      path: '/employer-dashboard/add-new-jobs',
      //icon: <AgricultureIcon />
    },
    {
      menuItem: 'Update Jobs',
      path: '/employer-dashboard/edit-jobs',
      //icon: <AgricultureIcon />
    },
    {
      menuItem: 'Manage Jobs',
      path: '/employer-dashboard/manage-jobs',
      //icon: <AgricultureIcon />
    },
    {
      menuItem: 'All Applications',
      path: '/employer-dashboard/applied-job-posts',
      //icon: <AgricultureIcon />
    },
    {
      menuItem: 'Change Password',
      path: '/employer-dashboard/change-password',
      //icon: <AgricultureIcon />
    },
    {
      menuItem: 'Logout',
      path: '/login',
      //icon: <AgricultureIcon />
    }
  ]

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