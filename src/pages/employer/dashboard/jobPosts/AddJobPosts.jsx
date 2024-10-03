
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import '../../../../CSSModules/formStyles/formPageStyles.css'
import { useDispatch } from 'react-redux';
import '../../../../CSSModules/pageStyles/jobPostsStyles.css'
import { createJobPosts } from '../../../../api\'s/employerApi\'s';



const AddJobPosts = () => {
    const [jobPosts, setJobPosts] = useState({
        companyName:'',
        role:'',
        technologies:'',
        experience:'',
        graduation:'',
        location:'',
        languages:'',
        noticePeriod:'',
        jobAppliedStatus:"Denied"
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobPosts((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await dispatch(createJobPosts(jobPosts));
    if (response.success) {
      setJobPosts({
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
      Post a New Job!
      </Typography>
      <Typography variant="body2"  sx={{ mb:3}}>
        Ready to jump back in?
      </Typography>

<Paper sx={{padding:'30px', borderRadius:'10px'}}>
  <Typography variant='h5' sx={{color:'black', mb:2}}>Post Job</Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField variant="outlined" fullWidth margin="normal"
            label="Company Name" name="companyName" type="text" required
            value={jobPosts.companyName}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Role" name="role" type="text" required
            value={jobPosts.role}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Technologies" name="technologies" type="text" required
            value={jobPosts.technologies}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Experience" name="experience" type="text" required
            value={jobPosts.experience}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Graduation" name="graduation" type="text" required
            value={jobPosts.graduation}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Location" name="location" type="text" required
            value={jobPosts.location}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Languages" name="languages" type="text" required
            value={jobPosts.languages}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Notice Period" name="noticePeriod" type="text" required
            value={jobPosts.noticePeriod}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" >Post</Button>
        </Box>
        </Paper>
    </>
  )
}

export default AddJobPosts