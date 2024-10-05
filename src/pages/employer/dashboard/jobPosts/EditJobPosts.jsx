
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../../../CSSModules/formStyles/formPageStyles.css'
import { useDispatch, useSelector } from 'react-redux';
import '../../../../CSSModules/pageStyles/jobPostsStyles.css'
import {  updateJobPostsData } from '../../../../api\'s/employerApi\'s';
import {  useNavigate, useParams } from 'react-router-dom';


const EditJobPosts = () => {
  const [updateJobPosts, setUpdateJobPosts] = useState({
    companyName: '',
    role: '',
    technologies: '',
    experience: '',
    graduation: '',
    location: '',
    languages: '',
    noticePeriod: ''
  });

  const { jobPosts } = useSelector((state) => state.employerReducer);

  const { id } = useParams();

  const jobData = jobPosts.find(job => job._id === id);

  useEffect(() => {
    if (jobData) {
      setUpdateJobPosts({
        _id: jobData._id || '',
        companyName: jobData.companyName || '',
        role: jobData.role || '',
        technologies: jobData.technologies || '',
        experience: jobData.experience || '',
        graduation: jobData.graduation || '',
        location: jobData.location || '',
        languages: jobData.languages || '',
        noticePeriod: jobData.noticePeriod || '',
      });
    }
  }, [jobData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateJobPosts((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await dispatch(updateJobPostsData(updateJobPosts, navigate));
    if (response.success) {
      setUpdateJobPosts({
        companyName:'', 
        role:'',
        technologies:'',
        experience:'',
        graduation:'',
        location:'',
        languages:'',
        noticePeriod:''
      });
    }
  }
  return (
    <>
  <Typography variant="h4"  sx={{color:'black', mb:3}}>
      Update a New Job!
      </Typography>
      <Typography variant="body2"  sx={{ mb:3}}>
        Ready to jump back in?
      </Typography>

      <Paper sx={{padding:'30px', borderRadius:'10px'}}>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField variant="outlined" fullWidth margin="normal"
            label="Company Name" name="companyName" type="text" required
            value={updateJobPosts?.companyName}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Role" name="role" type="text" required
            value={updateJobPosts?.role}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Technologies" name="technologies" type="text" required
            value={updateJobPosts?.technologies}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Experience" name="experience" type="text" required
            value={updateJobPosts?.experience}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Graduation" name="graduation" type="text" required
            value={updateJobPosts?.graduation}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Location" name="location" type="text" required
            value={updateJobPosts?.location}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Languages" name="languages" type="text" required
            value={updateJobPosts?.languages}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal" sx={{mb:3}}
            label="Notice Period" name="noticePeriod" type="text" required
            value={updateJobPosts?.noticePeriod}
            onChange={handleChange}
          />
         <Button type="submit" variant="contained" sx={{
            width: '30%',
            display: 'block',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            Update
          </Button>
        </Box>
        </Paper>
    </>
  )
}

export default EditJobPosts