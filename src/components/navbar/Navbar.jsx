import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { Box, List, ListItem, ListItemText, ListItemIcon, AppBar, Toolbar, Button, IconButton, Avatar, Menu, Typography, MenuItem, Drawer } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Import the appropriate icon
import PeopleIcon from '@mui/icons-material/People'; // Import the appropriate icon
import LoginIcon from '@mui/icons-material/Login'; // Import the appropriate icon
import RegisterIcon from '@mui/icons-material/PersonAdd'; // Import the appropriate icon



const Navbar = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginData = useSelector((state) => state.authReducer.userData);
    const profilePic = useSelector((state) => state.authReducer.profileImage);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = () => (
        <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {loginData && loginData.email ? (
                    <>
                        <ListItem button onClick={() => navigate('/home-page')}>
                            <ListItemIcon>
                                <HomeIcon sx={{ color: '#0557A2'}}/> 
                            </ListItemIcon>
                            <ListItemText primary="Home" sx={{ color: '#0557A2'}}/>
                        </ListItem>
                        <ListItem button onClick={() => navigate('/find-jobs')}>
                            <ListItemIcon>
                                <SearchIcon sx={{ color: '#0557A2'}}/> 
                            </ListItemIcon>
                            <ListItemText primary="Find Jobs" sx={{ color: '#0557A2'}}/>
                        </ListItem>
                        {loginData.role === 'employer' ? (
                            <>
                            <ListItem button onClick={() => navigate('/employer-dashboard/home')}>
                                <ListItemIcon>
                                    <DashboardIcon sx={{ color: '#0557A2'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Employers" sx={{ color: '#0557A2'}}/>
                            </ListItem>
                            <ListItem button onClick={() => navigate('/employer-dashboard/change-password')}>
                            <ListItemIcon>
                                <LockIcon sx={{ color: '#0557A2'}}/> 
                            </ListItemIcon>
                            <ListItemText primary="ChangePassword" sx={{ color: '#0557A2'}}/>
                        </ListItem>
                            </>
                        ) : (
                            <>
                            <ListItem button onClick={() => navigate('/candidate-dashboard/home')}>
                                <ListItemIcon>
                                    <PeopleIcon sx={{ color: '#0557A2'}}/> 
                                </ListItemIcon>
                                <ListItemText primary="Candidates" sx={{ color: '#0557A2'}}/>
                            </ListItem>
                            <ListItem button onClick={() => navigate('/candidate-dashboard/change-password')}>
                            <ListItemIcon>
                                <LockIcon sx={{ color: '#0557A2'}}/> 
                            </ListItemIcon>
                            <ListItemText primary="ChangePassword" sx={{ color: '#0557A2'}}/>
                        </ListItem>
                            </>
                        )}

                        <ListItem button onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon sx={{ color: '#0557A2'}}/> 
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ color: '#0557A2'}}/>
                        </ListItem>
                    </>
                ) : (
                    <Box sx={{ padding: '20px', width: '80%' }}>
                        <Box
                            component="div"
                            sx={{
                                fontSize: '16px',
                                borderRadius: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#0557A2',
                                color: '#fff',
                                textAlign: 'center',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                margin: '30px 0'
                            }}
                            onClick={() => navigate('/login')}
                        >
                            <LoginIcon /> 
                            Login
                        </Box>
                        <Box
                            component="div"
                            sx={{
                                fontSize: '16px',
                                borderRadius: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#0557A2',
                                color: '#fff',
                                textAlign: 'center',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                            onClick={() => navigate('/new-registration')}
                        >
                            <RegisterIcon /> 
                            Register
                        </Box>
                    </Box>
                )}
            </List>
        </Box>
    );

    const userProfileImage = profilePic.find((pic) => pic.user_id === loginData?._id);

    return (
        <AppBar position="fixed" sx={{ height: '10vh', backgroundColor: 'pink', boxShadow: 'none', padding: { xs: '0 30px', md: '0px 90px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                {/* Logo and Company Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', cursor:'pointer' }} onClick={()=>navigate('/home-page')}>
                    <Box component="img" src={require('../../Assets/main-logo.jpg')} alt="logo" sx={{ height: 50, mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Careerbridge
                    </Typography>
                </Box>

                {loginData && loginData.email ? (
                    <>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <Box sx={{ display: { md: 'flex', xs: 'none' }, gap: 2, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Button sx={{ color: '#0557A2', fontWeight: 'bold' }} onClick={() => navigate('/home-page')}>Home</Button>
                                <Button sx={{ color: '#0557A2', fontWeight: 'bold' }} onClick={() => navigate('/find-jobs')}>Find Jobs</Button>
                                {loginData.role === 'employer' ? (
                                    <Button sx={{ color: '#0557A2', fontWeight: 'bold' }} onClick={() => navigate('/employer-dashboard/home')}>Employers</Button>
                                ) : (
                                    <Button sx={{ color: '#0557A2', fontWeight: 'bold' }} onClick={() => navigate('/candidate-dashboard/home')}>Candidates</Button>
                                )}
                            </Box>

                            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar alt="Profile" src={userProfileImage?.profileImage} />
                                </IconButton>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={() => navigate(loginData.role === 'employer' ? '/employer-dashboard/employer-profile-details' : '/candidate-dashboard/employee-profile-details')}>
                                        <Box display="flex" alignItems="center" gap={1.5}>
                                            <Avatar alt="Profile" src={userProfileImage?.profileImage} />
                                            <Typography textAlign="center" sx={{ color: '#0557A2' }}>View Profile</Typography>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate(loginData.role === 'employer' ? '/employer-dashboard/change-password' : '/candidate-dashboard/change-password')}>
                                        <Box display="flex" alignItems="center" gap={1.5}>
                                            <LockIcon fontSize="large" sx={{ color: '#0557A2' }} />
                                            <Typography textAlign="center" sx={{ color: '#0557A2' }}>Change Password</Typography>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Box display="flex" alignItems="center" gap={1.5}>
                                            <LogoutIcon fontSize="large" sx={{ color: '#0557A2' }} />
                                            <Typography textAlign="center" sx={{ color: '#0557A2' }}>Logout</Typography>
                                        </Box>
                                    </MenuItem>

                                </Menu>
                            </Box >
                        </Box >
                    </>
                ) : (
                    <>
                        <Box sx={{ display: { md: 'flex', xs: 'none' }, gap: 2 }}>
                            <Box
                                component="div"
                                sx={{
                                    fontSize: '16px',
                                    borderRadius: '10px',
                                    padding: '10px 20px',
                                    backgroundColor: '#0557A2',
                                    color: '#fff',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Box>
                            <Box
                                component="div"
                                sx={{
                                    fontSize: '16px',
                                    borderRadius: '10px',
                                    padding: '10px 20px',
                                    backgroundColor: '#0557A2',
                                    color: '#fff',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                                onClick={() => navigate('/new-registration')}
                            >
                                Register
                            </Box>
                        </Box>
                    </>
                )}

                {/* Mobile Hamburger Menu and Profile Icon */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 2 }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon color='primary' fontSize='large' />
                    </IconButton>
                    {loginData && loginData.email && (
                        <IconButton onClick={handleOpenUserMenu}>
                            <Avatar alt="Profile" src={userProfileImage?.profileImage} />
                        </IconButton>
                    )}
                </Box>

            </Toolbar >

            {/* Drawer for Mobile Menu */}
            < Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} >
                {drawerList()}
            </Drawer >
        </AppBar>
    );
}

export default Navbar;
