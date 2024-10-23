import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import SidebarNavbar from '../navbar/SidebarNavbar';

const drawerWidth = 250;

const SideBar = ({ menuItems }) => {
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
                      <ListItemButton component={Link} to={path}>
                        <ListItemIcon
                          sx={{
                            color: '#0557A2',
                          }}
                        >
                          {icon || <div style={{ width: 24, height: 24 }} />}
                        </ListItemIcon>
                        <ListItemText
                          primary={menuItem || 'No Menu Item'}
                          sx={{
                            color: '#0557A2',
                            fontWeight: 'bold'
                          }}
                        />

                      </ListItemButton>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No menu items available" 
                    sx={{
                      color: '#0557A2',
                      fontWeight: 'bold'
                    }}
                     />
                  </ListItem>
                )
              }
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  )
}

export default SideBar;
