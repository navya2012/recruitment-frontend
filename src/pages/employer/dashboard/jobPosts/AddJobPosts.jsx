import { Box, Button, ListItemIcon, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import '../../../../CSSModules/formStyles/formPageStyles.css';
import { useDispatch } from 'react-redux';
import { createJobPosts } from '../../../../api\'s/employerApi\'s';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { useNavigate } from 'react-router-dom';

const AddJobPosts = () => {
  const [newJobPosts, setNewJobPosts] = useState({
    companyName: '',
    role: '',
    technologies: '',
    experience: '',
    graduation: '',
    location: '',
    languages: '',
    noticePeriod: '',
    jobAppliedStatus: "Denied"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJobPosts((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(createJobPosts(newJobPosts, navigate));
    if (response.success) {
      setNewJobPosts({
        companyName: '',
        role: '',
        technologies: '',
        experience: '',
        graduation: '',
        location: '',
        languages: '',
        noticePeriod: ''
      });
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{  mb: 3 }}>
        Post a New Job!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color:'#0557A2' }}>
        Ready to jump back in?
      </Typography>

      <Paper sx={{ padding: '30px', borderRadius: '10px' }}>
        <Typography variant='h5' sx={{  mb: 2 }}>Post Job</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 4, padding: '20px 0' }}>
          <ListItemIcon>
            <BusinessCenterOutlinedIcon sx={{
              textAlign: "center", backgroundColor: '#1967d21a', width: '100px', height: '100px', borderRadius: '50%', fontSize: '30px', color: '#1967d2', padding: '20px'
            }} />
          </ListItemIcon>
          <Typography variant="h6" sx={{ color:'#0557A2', fontWeight: 500 }}>
            Job Details
          </Typography>
        </Box>

        <Box component='form' onSubmit={handleSubmit}>
          <TextField variant="outlined" fullWidth margin="normal"
            label="Company Name" name="companyName" type="text" required
            value={newJobPosts.companyName}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Role" name="role" type="text" required
            value={newJobPosts.role}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Technologies" name="technologies" type="text" required
            value={newJobPosts.technologies}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Experience" name="experience" type="text" required
            value={newJobPosts.experience}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Graduation" name="graduation" type="text" required
            value={newJobPosts.graduation}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Location" name="location" type="text" required
            value={newJobPosts.location}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Languages" name="languages" type="text" required
            value={newJobPosts.languages}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal" sx={{ mb: 4 }}
            label="Notice Period" name="noticePeriod" type="text" required
            value={newJobPosts.noticePeriod}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" sx={{
            width: '30%',
            display: 'block',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            Post
          </Button>
        </Box>
      </Paper>
    </>
  );
}

export default AddJobPosts;
