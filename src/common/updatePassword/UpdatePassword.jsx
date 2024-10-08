import React, { useState } from 'react'
import { Box, Button, Grid, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import AuthCoverPage from '../authCoverPage/AuthCoverPage';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../api\'s/authApi\'s';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LoadingSpinner from '../spinner/LoadingSpinner';


const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await updatePassword(newPassword, navigate);
      if (response.success) {
        setNewPassword('')
      }
    } catch (err) {
      throw new Error(err.message)
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Grid container height="auto" sx={{ paddingBottom: '50px' }}>
        <Grid item xs={12} sm={6}>
          <AuthCoverPage />
        </Grid>
        {
          loading ? (
            <LoadingSpinner />
          ) : (
            <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="center">
              <Box className='form-page-styles'>
                <Typography variant="h4" sx={{ paddingBottom: '30px' }} >
                  Update Password
                </Typography>
                <Box component='form' onSubmit={handleSubmit}>
                  <TextField variant="outlined" fullWidth margin="normal" required
                    label="Password" name="password" type={showPassword ? "text" : "password"}
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
                        </InputAdornment>

                      )
                    }}
                  />
                  <Button type="submit" variant="contained" sx={{ marginTop: '40px' }}>Submit</Button>
                </Box>
              </Box>
            </Grid>
          )
        }

      </Grid>
    </>
  )
}

export default UpdatePassword