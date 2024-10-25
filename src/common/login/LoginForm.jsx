
import { Box, Button, TextField, Typography, InputAdornment, IconButton, useTheme } from '@mui/material'
import React, { useState } from 'react'
import '../../CSSModules/formStyles/formPageStyles.css'
import { Link, useNavigate } from 'react-router-dom'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useDispatch } from 'react-redux';
import { clearError } from '../../redux/slices/authSlice';
import { login } from '../../api\'s/authApi\'s';
import LoadingSpinner from '../spinner/LoadingSpinner';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    dispatch(clearError());
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const response = await dispatch(login(formData, navigate));
      if (response.success) {
        setFormData({
          email: '',
          password: '',
        });
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Box className='form-page-styles' sx={{ width: '100%', position: 'relative', height: '100vh' }}>
        {
          loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 10
              }}
            >
              <LoadingSpinner />
            </Box>
          ) : (
            <>
              <Typography variant="h5" sx={theme.typography.welcomeHeader}>
                Login Form
              </Typography>
              <Box component='form' onSubmit={handleSubmit}>
                <TextField variant="outlined" fullWidth margin="normal" 
                  label="Email" name="email" type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField variant="outlined" fullWidth margin="normal"
                  label="Password" name="password" type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>

                    )
                  }}
                />
                <Link to='/forgot-password' className='link-style' style={{ float: 'right', paddingTop: '25px' }}>Forgot Password ?</Link>
                <Button type="submit" variant="contained"
                  sx={{
                    width: '50%',
                    display: 'block',
                    margin: '80px auto',
                    textAlign: 'center',
                    marginBottom: 0
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </>
          )
        }
        <div className='line-design'>
          <hr />
          <span className='text'>Or sign In with</span>
          <hr />
        </div>

        <Box className='link-text-style'> Don't have an account?{'  '}
          <Link to='/new-registration' className='link-style'>Sign Up</Link>
        </Box>
      </Box>
    </>
  )
}

export default LoginForm