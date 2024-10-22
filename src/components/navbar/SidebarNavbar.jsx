import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Menu,
    MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

const SidebarNavbar = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginData = useSelector((state) => state.authReducer.userData);
    const profilePic = useSelector((state) => state.authReducer.profileImage);
    console.log(loginData)

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
            sx={{ width: 300,

             }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {loginData && loginData.email ? (
                    <>
                        <ListItem button onClick={() => navigate('/home-page')}>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('/find-jobs')}>
                            <ListItemText primary="Find Jobs" />
                        </ListItem>

                        {loginData.role === 'employer' ? (
                            <ListItem button onClick={() => navigate('/employer-dashboard/home')}>
                                <ListItemText primary="Employers" />
                            </ListItem>
                        ) : (
                            <ListItem button onClick={() => navigate('/candidate-dashboard/home')}>
                                <ListItemText primary="Candidates" />
                            </ListItem>
                        )}
                            <Box sx={{ p: 2 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => navigate('/find-jobs')}
                                >
                                    Find Jobs
                                </Button>
                            </Box>
                    </>
                ) : (
                    <>
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
                                onClick={() => navigate('/welcome-page')}
                            >
                                Register
                            </Box>
                        </Box>
                    </>
                )}
            </List>
        </Box>
    );

    const userProfileImage = profilePic.find((pic) => pic.user_id === loginData?._id);

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#fff', boxShadow: 'none', padding: { xs: '10px', md: '20px 90px' } }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Logo and Company Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box component="img" src={require('../../Assets/main-logo.jpg')} alt="logo" sx={{ height: 50, mr: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                             Careerbridge 
                        </Typography>
                    </Box>

                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
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
                                        onClick={() => navigate('/find-jobs')}
                                    >
                                        Find Jobs
                                    </Box>

                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}> {loginData.email.replace('@gmail.com', '')}</Typography>
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
                                        <Box display="flex" alignItems="center"  gap={1.5}>
                                        <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar alt="Profile" src={userProfileImage?.profileImage} />
                                </IconButton>
                                            <Typography textAlign="center">View Profile</Typography>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate(loginData.role === 'employer' ? '/employer-dashboard/change-password' : '/candidate-dashboard/change-password')}>
                                        <Box display="flex" alignItems="center" gap={4}>
                                            <LockIcon fontSize="large" />
                                            <Typography textAlign="center">Change Password</Typography>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Box display="flex" alignItems="center" gap={4}>
                                            <LogoutIcon fontSize="large" />
                                            <Typography textAlign="center">Logout</Typography>
                                        </Box>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Box>

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

                </Toolbar>
            </Container>

            {/* Drawer for Mobile Menu */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} sx={{                zIndex: (theme) => theme.zIndex.drawer + 2,}}>
                {drawerList()}
            </Drawer>
        </AppBar>
    );
}

export default SidebarNavbar;
