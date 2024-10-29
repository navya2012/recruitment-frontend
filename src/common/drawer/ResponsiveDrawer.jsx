import { Box, Drawer, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, IconButton, } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import MenuIcon from '@mui/icons-material/Menu';

const ResponsiveDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginData = useSelector((state) => state?.authReducer?.userData);

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
            sx={{ width: 250, padding: '30px 10px' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/home-page')}>
                    <Box component="img" src={require('../../Assets/main-logo.jpg')} alt="logo" sx={{ height: 40, mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0557A2' }}>
                        Careerbridge
                    </Typography>

                </Box>
                {
                    loginData && loginData.email && (
                        <Typography variant="body2" sx={{ fontWeight: 'bold', paddingLeft: '60px' }}>
                            {loginData.email.replace('@gmail.com', '')}
                        </Typography>
                    )
                }
                <Divider sx={{ margin: '15px 0' }} />
                <List>
                    {
                        loginData && loginData.email ? (
                            <>
                                <ListItem button onClick={() => navigate('/home-page')}>
                                    <ListItemIcon sx={{ minWidth: '40px' }}>
                                        <HomeIcon sx={{ color: '#0557A2' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" sx={{ color: '#0557A2' }} />
                                </ListItem>

                                <ListItem button onClick={() => navigate('/find-jobs')}>
                                    <ListItemIcon sx={{ minWidth: '40px' }}>
                                        <SearchIcon sx={{ color: '#0557A2' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Find Jobs" sx={{ color: '#0557A2' }} />
                                </ListItem>

                                {
                                    loginData.role === 'employer' ? (
                                        <>
                                            <ListItem button onClick={() => navigate('/employer-dashboard/home')}>
                                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                                    <PeopleIcon sx={{ color: '#0557A2' }} />
                                                </ListItemIcon>
                                                <ListItemText primary="Employers" sx={{ color: '#0557A2' }} />
                                            </ListItem>

                                            <ListItem button onClick={() => navigate('/employer-dashboard/change-password')}>
                                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                                    <LockIcon sx={{ color: '#0557A2' }} />
                                                </ListItemIcon>
                                                <ListItemText primary="ChangePassword" sx={{ color: '#0557A2' }} />
                                            </ListItem>
                                        </>
                                    ) : (
                                        <>
                                            <ListItem button onClick={() => navigate('/candidate-dashboard/home')}>
                                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                                    <PeopleIcon sx={{ color: '#0557A2' }} />
                                                </ListItemIcon>
                                                <ListItemText primary="Candidates" sx={{ color: '#0557A2' }} />
                                            </ListItem>

                                            <ListItem button onClick={() => navigate('/candidate-dashboard/change-password')}>
                                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                                    <LockIcon sx={{ color: '#0557A2' }} />
                                                </ListItemIcon>
                                                <ListItemText primary="ChangePassword" sx={{ color: '#0557A2' }} />
                                            </ListItem>
                                        </>
                                    )}

                                <ListItem button onClick={handleLogout}>
                                    <ListItemIcon sx={{ minWidth: '40px' }}>
                                        <LogoutIcon sx={{ color: '#0557A2' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" sx={{ color: '#0557A2' }} />
                                </ListItem>
                            </>
                        ) : (
                            <Box sx={{ width: '70%', padding: '0 20px' }}>
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
                                    onClick={() => navigate('/new-registration')}
                                >
                                    Register
                                </Box>
                            </Box>
                        )
                    }
                </List>
            </>
        </Box>
    );
    return (
        <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon color='primary' fontSize='large' />
            </IconButton>

            < Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                {drawerList()}
            </Drawer >
        </>
    )
}

export default ResponsiveDrawer