import { Box, Typography, Grid, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExperienceUpdateForm from './ExperienceUpdateForm';
import ExperienceForm from './ExperienceForm';
import { useExperienceContextData } from '../../../context/ExperienceProvider';
import { getWorkingExperience } from '../../../api\'s/employeeApi\'s';

const WorkingExperience = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { setUpdateExperienceData } = useExperienceContextData();

  const { experienceData } = useSelector((state) => state.employeeReducer);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWorkingExperience())
  }, [dispatch])

  const handleAddData = () => {
    setIsEditing(false);
    setOpen(true);
  }

  const handleEdit = () => {
    setIsEditing(true);
    setUpdateExperienceData({
      _id: experienceData._id,
      technologies: experienceData.technologies,
      experience: experienceData.experience,
      graduation: experienceData.graduation,
      location: experienceData.location,
      languages: experienceData.languages,
      noticePeriod: experienceData.noticePeriod
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '0 50px' }}>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { xs: 'center', sm: 'space-between' },
              alignItems: 'center',
              paddingBottom: '40px',
              gap: { xs: '15px', sm: '50px' },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Working Experience
            </Typography>
            <Box sx={{ display: 'flex', gap: '30px', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
              <EditIcon onClick={handleEdit} fontSize="large" sx={{ color: '#0557A2', cursor: 'pointer' }} />
              <AddIcon onClick={handleAddData} fontSize="large" sx={{ color: '#0557A2', cursor: 'pointer' }} />
            </Box>
          </Box>

          <Grid container spacing={2}>
            {[
              { label: 'Technologies', value: experienceData.technologies?.join(', ') || 'N/A' },
              { label: 'Experience', value: experienceData.experience || 'N/A' },
              { label: 'Graduation', value: experienceData.graduation || 'N/A' },
              { label: 'Location', value: experienceData.location || 'N/A' },
              { label: 'Languages', value: experienceData.languages?.join(', ') || 'N/A' },
              { label: 'Notice Period', value: experienceData.noticePeriod || 'N/A' },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    padding: '20px',
                    border: '2px solid #0557A2',
                    borderRadius: '15px',
                    backgroundColor: '#fff',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      color: '#0557A2',
                      fontSize: '18px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '16px',
                      color: '#333',
                      fontWeight: 'normal',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-profile-modal-title"
        aria-describedby="edit-profile-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: 24,
          width: '90%',
          maxWidth: '750px'
        }}
        >
          {isEditing ? (
            <ExperienceUpdateForm handleClose={handleClose} setOpen={setOpen} />
          ) : (
            <ExperienceForm handleClose={handleClose} setOpen={setOpen} />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default WorkingExperience;
