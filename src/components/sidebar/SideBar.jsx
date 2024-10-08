import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import SidebarNavbar from '../navbar/SidebarNavbar';

const drawerWidth = 250

const SideBar = ({ menuItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <SidebarNavbar />
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
          <Box sx={{ overflow: 'auto', paddingTop: '50px' }}>
            <List>
              {
                menuItems.length > 0 ? (
                  menuItems.map(({ menuItem, path, icon }, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={menuItem === 'Logout' ? handleLogout : null}
                        component={menuItem === 'Logout' ? 'div' : Link}
                        to={menuItem === 'Logout' ? undefined : path}
                      >
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