import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { Avatar } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';

const pages = {
  employee: [
    { name: 'Home', path: '/employee/dashboard' },
    { name: 'Find a Job', path: '/employee/jobs' },
  ],
  employer: [
    { name: 'Home', path: '/employer/dashboard' },
    { name: 'Post a Job', path: '/employer/jobs' },
    { name: 'Applications', path: '/employer/applications' },
  ],
};

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginData = useSelector((state) => state.authReducer.userData);
  const profilePic = useSelector((state) => state.authReducer.profileImage);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Check if loginData exists before trying to access role
  const userPages = loginData && loginData.role === 'employee' ? pages.employee : pages.employer;

  const handleLogoClick = () => {
    if (loginData) {
      if (loginData.role === 'employee') {
        navigate('/employee/dashboard');
      } else if (loginData.role === 'employer') {
        navigate('/employer/dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    if (loginData) {
      if (loginData.role === 'employer') {
        navigate('/employer/profile');
      } else if (loginData.role === 'employee') {
        navigate('/employee/profile');
      }
    }
  };

  const userProfileImage = profilePic.find((pic) => pic.user_id === loginData._id);

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="button"
            onClick={handleLogoClick}
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              background: 'none',
              border: 'none',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            INKPROG
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {
                loginData && loginData.email ?

                  userPages.map((page) => (
                    <MenuItem key={page.path} onClick={() => handleNavigation(page.path)}>
                      <Typography variant="body2" textAlign="center">
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))

                  : [
                    <MenuItem onClick={() => navigate('/signup')}>
                      <Typography textAlign="center">Sign Up</Typography>
                    </MenuItem>,
                    <MenuItem onClick={() => navigate('/login')}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  ]
              }
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {loginData && loginData.email ? (
              <>
                {userPages.map((page) => (
                  <Button
                    key={page.path}
                    onClick={() => handleNavigation(page.path)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                ))}
              </>
            ) : (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => navigate('/signup')} sx={{ my: 2, color: 'white' }}>
                  Sign Up
                </Button>
                <Button onClick={() => navigate('/login')} sx={{ my: 2, color: 'white' }}>
                  Login
                </Button>
              </Box>
            )}
          </Box>

          {/* User Avatar and Menu */}
          {loginData && loginData.email && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userProfileImage?.profileImage} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleProfileClick}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar alt="Remy Sharp" src={userProfileImage?.profileImage} />
                    <Typography textAlign="center">View Profile</Typography>
                  </Box>
                </MenuItem>
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
    </AppBar>
  );
};

export default Navbar;



