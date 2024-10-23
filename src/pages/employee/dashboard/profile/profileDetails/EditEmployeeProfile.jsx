import { Box, TextField, Typography, IconButton, Avatar, Button, InputAdornment, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { updateEmployeeDetails } from '../../../../../api\'s/employeeApi\'s';
import { imageUploads } from '../../../../../api\'s/authApi\'s';
import { useAuthContextData } from '../../../../../context/AuthProvider';

const EditEmployeeProfile = () => {
  const { updateEmployeeFormData, setUpdateEmployeeFormData, handleChangeUpdateEmployeeFormData } = useAuthContextData();

  const profileImages = useSelector((state) => state.authReducer.profileImage);

  const userProfileImage = profileImages.find((pic) => pic.user_id === updateEmployeeFormData._id);

  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(userProfileImage?.profileImage || null);
  // Show the existing image or default one

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a preview for the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result); // Preview the new image before upload
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Image upload
      if (file) {
        const formData = new FormData();
        formData.append('profileImage', file);
        await dispatch(imageUploads(formData, navigate));
      }
    } catch (error) {
      throw new Error("error in image upload", error.message)
    }
    try {
      // Update remaining fields
      const response = await dispatch(updateEmployeeDetails(updateEmployeeFormData, navigate));
      if (response.success) {
        setUpdateEmployeeFormData({
          _id: null,
          role: 'employee',
          email: '',
          password: '',
          mobileNumber: '',
          firstName: '',
          lastName: '',
          position: '',
          currentCompany: '',
          location: '',
          otp: '',
          isVerified: false,
          agreeToTerms: false,
        });
      }
    } catch (error) {
      throw new Error(error.message)
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{  mb: 3 }}>
        Update Profile!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color:'#0557A2'  }}>
        Ready to jump back in?
      </Typography>

      <Paper sx={{ padding: '40px', borderRadius: '10px' }}>
        <Typography variant='h5' sx={{  mb: 3 }}>Update My Profile</Typography>
        {updateEmployeeFormData && (
          <>
            <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center', position: 'relative' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 3, position: 'relative' }}>
                <Avatar
                  src={imagePreview || '/default-profile.png'} 
                  alt="Profile Image"
                  sx={{
                    width: 150,
                    height: 150,
                    border: '2px solid #3f51b5',
                  }}
                />

                <IconButton
                  aria-label="upload picture"
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: '43%',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    padding: '5px',
                  }}
                >
                  <PhotoCamera fontSize='large' />
                  <input
                    accept="image/*"
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </IconButton>
              </Box>

              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                required
                value={updateEmployeeFormData.email}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                required
                value={updateEmployeeFormData.mobileNumber}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                label="First Name"
                name="firstName"
                type="text"
                required
                value={updateEmployeeFormData.firstName}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                label="Last Name"
                name="lastName"
                type="text"
                required
                value={updateEmployeeFormData.lastName}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                label="Position"
                name="position"
                type="text"
                required
                value={updateEmployeeFormData.position}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                label="Current Company"
                name="currentCompany"
                type="text"
                required
                value={updateEmployeeFormData.currentCompany}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                label="Location"
                name="location"
                type="text"
                required
                value={updateEmployeeFormData.location}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={updateEmployeeFormData.password}
                onChange={handleChangeUpdateEmployeeFormData}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button type="submit" variant="contained" sx={{
                width: '30%',
                display: 'block',
                margin: '0 auto',
                textAlign: 'center',
                marginTop: '30px'
              }}>
                Submit
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </>
  );
};

export default EditEmployeeProfile;
