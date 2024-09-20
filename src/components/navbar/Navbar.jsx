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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = {
  employee: [
    { name: ' Home', path: '/employee/dashboard' },
    { name: ' Find a Job', path: '/employee/jobs' },
  ],
  employer: [
    { name: ' Home', path: '/employer/dashboard' },
    { name: ' Jobs', path: '/employer/jobs' },
    { name: ' Applications', path: '/employer/applications' },
  ],
};

const Navbar = ()  => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.authReducer.userData);

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

  const userPages = loginData.role === 'employee' ? pages.employee : pages.employer;

  const handleLogoClick = () => {
    if (loginData.role === 'employee') {
      navigate('/employee/dashboard');
    } else if (loginData.role === 'employer') {
      navigate('/employer/dashboard');
    } else {
      navigate('/login');
    }
  };

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
              {loginData.email ? (
                <Box>
                  {userPages.map((page) => (
                    <MenuItem key={page.path} onClick={() => handleNavigation(page.path)}>
                      <Typography variant='body2' textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Box>
              ) : (
                <Box>
                  <MenuItem onClick={() => navigate('/signup')}>
                    <Typography textAlign="center">Sign Up</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/login')}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {loginData.email ? (
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
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                  <Button
                    onClick={handleOpenUserMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                   <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ color: 'white', fontSize: 40 }} />
              </IconButton>
                  </Button>
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
                   <MenuItem disabled>
                   <Typography textAlign="center">{loginData.email}</Typography>
                   </MenuItem>
                   <MenuItem onClick={() => navigate('/reset-password')}>
                      <Typography textAlign="center">Change Password</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    onClick={() => navigate('/')}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => navigate('/login')}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Login
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
