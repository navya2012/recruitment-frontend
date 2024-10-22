import { Box, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { getWorkingExperience } from '../../../../../api\'s/employeeApi\'s';
import { useExperienceContextData } from '../../../../../context/ExperienceProvider';
import LoadingSpinner from '../../../../../common/spinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';


const WorkingExperience = () => {
  const { setUpdateExperienceData } = useExperienceContextData();

  const [loading, setLoading] = useState(true);

  const { experienceData } = useSelector((state) => state.employeeReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperienceData = async () => {
      setLoading(true);
      try {
        await dispatch(getWorkingExperience(navigate));
      } catch (error) {
        throw new Error(error.message)
      } finally {
        setLoading(false);
      }
    };
    fetchExperienceData();
  }, [dispatch, navigate]);

  const handleAddNewData = () => {
    navigate('/candidate-dashboard/add-working-experience')
  };

  const handleEdit = () => {
    setLoading(true);
    navigate('/candidate-dashboard/edit-working-experience')
    setUpdateExperienceData({
      _id: experienceData._id,
      technologies: experienceData.technologies,
      experience: experienceData.experience,
      graduation: experienceData.graduation,
      location: experienceData.location,
      languages: experienceData.languages,
      noticePeriod: experienceData.noticePeriod,
    });
    setLoading(false);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '20px',
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Working Experience
        </Typography>
        <Box sx={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <EditIcon onClick={handleEdit} fontSize="large" sx={{ color: '#0557A2', cursor: 'pointer' }} />
          <AddIcon onClick={handleAddNewData} fontSize="large" sx={{ color: '#0557A2', cursor: 'pointer' }} />
        </Box>
      </Box>

      {
        loading ? (
          <LoadingSpinner />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                <CodeIcon sx={{ marginRight: 1 }} />Technologies:
              </Typography>
              <Typography variant="body1">
                {Array.isArray(experienceData.technologies)
                  ? experienceData.technologies.join(', ')
                  : experienceData.technologies}
              </Typography>
            </Grid>


            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                <WorkIcon sx={{ marginRight: 1 }} />Experience:
              </Typography>
              <Typography variant="body1">{experienceData.experience}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                <SchoolIcon sx={{ marginRight: 1 }} />Graduation:
              </Typography>
              <Typography variant="body1">{experienceData.graduation}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                <LocationOnIcon sx={{ marginRight: 1 }} />Location:
              </Typography>
              <Typography variant="body1">{experienceData.location}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                <LanguageIcon sx={{ marginRight: 1 }} />Languages:
              </Typography>
              <Typography variant="body1">
                {Array.isArray(experienceData.languages)
                  ? experienceData.languages.join(', ')
                  : experienceData.languages}
              </Typography>
            </Grid>


            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0073e6' }}>
                <QueryBuilderIcon sx={{ marginRight: 1 }} />Notice Period:
              </Typography>
              <Typography variant="body1">{experienceData.noticePeriod}</Typography>
            </Grid>
          </Grid>
        )
      }
    </>
  );
};

export default WorkingExperience;
