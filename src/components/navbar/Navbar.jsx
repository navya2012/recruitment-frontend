import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box,  AppBar, Toolbar, Button,  Typography } from '@mui/material';
import UserProfileMenu from '../../common/avatar/UserProfileMenu';
import ResponsiveDrawer from '../../common/drawer/ResponsiveDrawer';



const DASHBOARD_PATHS = ['/candidate-dashboard/home', '/employer-dashboard/home'];

const Navbar = () => {
    const [showMainMenu, setShowMainMenu] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const loginData = useSelector((state) => state?.authReducer?.userData);

    useEffect(() => {
        const isDashboard = DASHBOARD_PATHS.includes(location.pathname);
        setShowMainMenu(!isDashboard);
    }, [location.pathname]);

    const handleMenuClick = (menu) => {
        setShowMainMenu(false);
        navigate(menu === 'Candidates' ? '/candidate-dashboard/home' : '/employer-dashboard/home');
    };
    return (
        <AppBar position="fixed" sx={{ height: '10vh', backgroundColor: 'white', boxShadow: 'none', padding: { xs: '0 40px', md: '0px 90px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Toolbar disableGutters sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3,
                width: '100%'
            }}>

                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/home-page')}>
                    <Box component="img" src={require('../../Assets/main-logo.jpg')} alt="logo" sx={{ height: 50, mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Careerbridge
                    </Typography>
                </Box>

                {loginData && loginData.email ? (
                    <>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <Box sx={{ display: { md: 'flex', xs: 'none' }, gap: 2, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    showMainMenu && (
                                        <>
                                            <Button sx={{ color: '#0557A2', fontWeight: 'bold' }} onClick={() => navigate('/home-page')}>
                                                Home
                                            </Button>
                                            <Button sx={{ color: '#0557A2', fontWeight: 'bold' }} onClick={() => navigate('/find-jobs')}>
                                                Find Jobs
                                            </Button>

                                            {
                                                loginData.role === 'employer' ? (
                                                    <Button sx={{ color: '#0557A2', fontWeight: 'bold' }} onClick={() => handleMenuClick('Employers')}>
                                                        Employers
                                                    </Button>
                                                ) : (
                                                    <Button sx={{ color: '#0557A2', fontWeight: 'bold' }} onClick={() => handleMenuClick('Candidates')}>
                                                        Candidates
                                                    </Button>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </Box>

                            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                <UserProfileMenu/>
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

                {/* Mobile Hamburger Menu */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 2 }}>
                    <ResponsiveDrawer/>
                </Box>
            </Toolbar >
        </AppBar>
    );
}

export default Navbar;
