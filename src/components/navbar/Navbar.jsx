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
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

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
        navigate('/login');
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    // Drawer content for mobile view
    const drawerList = () => (
        <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Home', 'Find Jobs', 'Employers', 'Candidates', 'Blog'].map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Box sx={{ p: 2 }}>
                <Button fullWidth variant="contained">Job Post</Button>
            </Box>
        </Box>
    );

    const userProfileImage = profilePic.find((pic) => pic.user_id === loginData?._id);

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#fff', boxShadow: 'none', padding: { xs: '10px', md: '20px 90px' } }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Logo and Company Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box component="img" src={require('../../Assets/logo.png')} alt="logo" sx={{ height: 40, mr: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                            Superio
                        </Typography>
                    </Box>

                    {/* Desktop Navigation Links */}
                    {loginData && loginData.email ? (
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button sx={{ color: '#000' }} onClick={() => navigate('/home-page')}>Home</Button>
                                <Button sx={{ color: '#000' }} onClick={() => navigate('/find-jobs')}>Find Jobs</Button>
                                <Button sx={{ color: '#000' }} onClick={() => navigate('/employer-dashboard')}>Employers</Button>
                                <Button sx={{ color: '#000' }} onClick={() => navigate('/candidates')}>Candidates</Button>
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ flexGrow: 1 }} /> // Empty space to push buttons to the right
                    )}

                    {/* Mobile Hamburger Menu and Profile Icon */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 2 }}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon color='primary' />
                        </IconButton>
                        {loginData && loginData.email && (
                            <IconButton onClick={handleOpenUserMenu}>
                                <Avatar alt="Profile" src={userProfileImage?.profileImage} />
                            </IconButton>
                        )}
                    </Box>

                    {/* Login and Register Buttons for Logged Out State */}
                    {!loginData || !loginData.email ? (
                        <Box sx={{ display: 'flex', gap: 2 }}>
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
                                onClick={() => navigate('/')}
                            >
                                Register
                            </Box>
                        </Box>
                    ) : (
                        // User Profile and Job Post Button for Desktop
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
                                onClick={() => navigate('/job-post')}
                            >
                                Job Post
                            </Box>
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
                                <MenuItem onClick={() => navigate('/change-password')}>
                                    <Box display="flex" alignItems="center" gap={1.5}>
                                        <LockIcon fontSize="large" />
                                        <Typography textAlign="center">Change Password</Typography>
                                    </Box>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Box display="flex" alignItems="center" gap={1.5}>
                                        <LogoutIcon fontSize="large" />
                                        <Typography textAlign="center">Logout</Typography>
                                    </Box>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
            {/* Drawer for Mobile Menu */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList()}
            </Drawer>
        </AppBar>
    );
}

export default Navbar;
