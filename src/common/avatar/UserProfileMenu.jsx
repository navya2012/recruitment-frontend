import React, { useState } from 'react'
import { Box, IconButton, Avatar, Menu, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';

const UserProfileMenu = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const loginData = useSelector((state) => state?.authReducer?.userData);
    const profilePic = useSelector((state) => state?.authReducer?.profileImage);

    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const userProfileImage = profilePic.find((pic) => pic.user_id === loginData?._id);
    return (
        <>
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
                        <Typography textAlign="center" sx={{ color: '#0557A2' }}>
                            View Profile
                        </Typography>
                    </Box>
                </MenuItem>

                <MenuItem onClick={() => navigate(loginData.role === 'employer' ? '/employer-dashboard/change-password' : '/candidate-dashboard/change-password')}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <LockIcon fontSize="large" sx={{ color: '#0557A2' }} />
                        <Typography textAlign="center" sx={{ color: '#0557A2' }}>
                            Change Password
                        </Typography>
                    </Box>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <LogoutIcon fontSize="large" sx={{ color: '#0557A2' }} />
                        <Typography textAlign="center" sx={{ color: '#0557A2' }}>
                            Logout
                        </Typography>
                    </Box>
                </MenuItem>

            </Menu>
        </>
    )
}

export default UserProfileMenu