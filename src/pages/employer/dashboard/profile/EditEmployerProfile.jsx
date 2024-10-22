import { Box, Button, TextField, Typography, InputAdornment, IconButton, Avatar, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useAuthContextData } from '../../../../context/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { updateEmployerDetails } from '../../../../api\'s/employerApi\'s';
import { imageUploads } from '../../../../api\'s/authApi\'s';

const EditEmployerProfile = () => {
  const { updateEmployerFormData, setUpdateEmployerFormData, handleChangeUpdateEmployerFormData } = useAuthContextData();

  const  profileImages  = useSelector((state) => state.authReducer.profileImage);

  const userProfileImage = profileImages.find((pic) => pic.user_id === updateEmployerFormData._id);
  
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(userProfileImage?.profileImage || null);

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
    // Prepare for image upload if a file is selected
    const formData = new FormData();
    if (file) {
      formData.append('profileImage', file);
      await dispatch(imageUploads(formData, navigate)); 
    }

    // Submit the rest of the form
    const response = await dispatch(updateEmployerDetails(updateEmployerFormData, navigate));
    if (response.success) {
      setUpdateEmployerFormData({
        _id: null,
        role: 'employer',
        email: '',
        password: '',
        mobileNumber: '',
        companyName: '',
        companyType: '',
        address: {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: ''
        },
        employeesCount: '',
        headQuarters: '',
        otp: '',
        isVerified: false,
        agreeToTerms: false,
      });
    }
  };

  return (
    <>
     <Typography variant="h4" sx={{ color: 'black', mb: 3 }}>
                Update Profile!
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
                Ready to jump back in?
            </Typography>

            <Paper sx={{ padding: '40px', borderRadius: '10px' }}>
            <Typography variant='h5' sx={{ color: 'black', mb: 3 }}>Update My Profile</Typography>

            {updateEmployerFormData && (
        <>
          <Box component='form' onSubmit={handleSubmit} sx={{ textAlign: 'center', position: 'relative' }}>
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
                  right: '42%',
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

            <TextField variant="outlined" fullWidth margin="normal"
              label="Role" name="role" value="employer" required
              InputProps={{
                readOnly: true
              }}
            />
            <TextField variant="outlined" fullWidth margin="normal"
              label="Email" name="email" type="email" required
              value={updateEmployerFormData.email}
              onChange={handleChangeUpdateEmployerFormData}
            />
            <TextField variant="outlined" fullWidth margin="normal"
              label="Mobile Number" name="mobileNumber" type="tel" required
              value={updateEmployerFormData.mobileNumber}
              onChange={handleChangeUpdateEmployerFormData}
            />
            <TextField variant="outlined" fullWidth margin="normal"
              label="Company Name" name="companyName" type="text" required
              value={updateEmployerFormData.companyName}
              onChange={handleChangeUpdateEmployerFormData}
            />
            <TextField variant="outlined" fullWidth margin="normal"
              label="Company Type" name="companyType" type="text" required
              value={updateEmployerFormData.companyType}
              onChange={handleChangeUpdateEmployerFormData}
            />
            <TextField variant="outlined" fullWidth margin="normal" required
              label="Address: Street" name="address.street" type="text"
              value={updateEmployerFormData.address.street}
              onChange={handleChangeUpdateEmployerFormData}
            />
            <TextField variant="outlined" fullWidth margin="normal"
              label="City" name="address.city" type="text" required
              value={updateEmployerFormData.address.city}
              onChange={handleChangeUpdateEmployerFormData}
            />
            <TextField variant="outlined" fullWidth margin="normal"
              label="State" name="address.state" type="text" required
              value={updateEmployerFormData.address.state}
              onChange={handleChangeUpdateEmployerFormData}
            />
            <TextField variant="outlined" fullWidth margin="normal"
              label="Country" name="address.country" type="text" required
              value={updateEmployerFormData.address.country}
              onChange={handleChangeUpdateEmployerFormData}
            />
            <TextField variant="outlined" fullWidth margin="normal" required
              label="ZIP Code" name="address.zipCode" type="number"
              value={updateEmployerFormData.address.zipCode}
              onChange={handleChangeUpdateEmployerFormData}
            />
            <TextField variant="outlined" fullWidth margin="normal" required
              label="No of Employees" name="employeesCount" type="number"
              value={updateEmployerFormData.employeesCount}
              onChange={handleChangeUpdateEmployerFormData}
            />
            <TextField variant="outlined" fullWidth margin="normal" required
              label="Head Quarters" name="headQuarters" type="text"
              value={updateEmployerFormData.headQuarters}
              onChange={handleChangeUpdateEmployerFormData}
            />
            <TextField variant="outlined" fullWidth margin="normal" required
              label="Password" name="password" type={showPassword ? "text" : "password"}
              value={updateEmployerFormData.password}
              onChange={handleChangeUpdateEmployerFormData}
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
            <Button type="submit" variant="contained" sx={{
            width: '30%',
            display: 'block',
            margin: '0 auto',
            textAlign: 'center',
            marginTop:'30px'
          }}>
              Submit
            </Button>
          </Box>
        </>
      )}
            </Paper>

    
    </>
  );
}

export default EditEmployerProfile;
