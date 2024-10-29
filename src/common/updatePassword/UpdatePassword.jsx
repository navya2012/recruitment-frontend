import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import AuthCoverPage from '../authCoverPage/AuthCoverPage';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../api\'s/authApi\'s';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LoadingSpinner from '../spinner/LoadingSpinner';
import { useDispatch } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); // Prevent default behavior
  };

  const handleClearPassword = () => {
    setNewPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updatePassword(newPassword, dispatch, navigate);
      if (response.success) {
        setNewPassword('');
      }
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container height="auto" sx={{ paddingBottom: '50px' }}>
      <Grid item xs={12} sm={6}>
        <AuthCoverPage />
      </Grid>

      <Grid item xs={12} sm={6} display="flex" alignItems="start" justifyContent="center" sx={{ position: 'relative' }}>
        <Box className='form-page-styles' sx={{ width: '100%', position: 'relative', height: '100vh' }}>
          {loading ? (
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
              <Typography variant="h4" sx={{ paddingBottom: '40px' }}>
                Update Password
              </Typography>
              <Box component='form' onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                        <IconButton onClick={handleClearPassword}>
                          {newPassword ? <ClearIcon sx={{ color: 'black' }} /> : null}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button type="submit" variant="contained" sx={{ marginTop: '40px' }}>Submit</Button>
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default UpdatePassword;
