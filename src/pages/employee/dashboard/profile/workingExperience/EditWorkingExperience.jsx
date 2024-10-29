import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Typography, Paper } from '@mui/material';
import { experienceOptions, graduationOptions, languageOptions, locationOptions, noticePeriodOptions, technologiesOptions } from './MenuOptions';
import { useDispatch } from 'react-redux';
import { useExperienceContextData } from '../../../../../context/ExperienceProvider';
import { useNavigate } from 'react-router-dom';
import { updateWorkingExperience } from '../../../../../api\'s/employeeApi\'s';


const EditWorkingExperience = () => {
    const { updateExperienceData, setUpdateExperienceData, handleChangeUpdateExperienceData } = useExperienceContextData()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await dispatch(updateWorkingExperience(updateExperienceData, navigate));
        if (response.success) {
            setUpdateExperienceData({
                technologies: [],
                experience: '',
                graduation: '',
                location: '',
                languages: [],
                noticePeriod: ''
            });
            navigate('/candidate-dashboard/employee-profile-details')
        }
    }
    return (
        <>
            <Typography variant="h4" sx={{  mb: 3 }}>
                Working Experience!
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color:'#0557A2'  }}>
                Ready to jump back in?
            </Typography>

            <Paper sx={{ padding: '40px', borderRadius: '10px' }}>
                <Typography variant='h5' sx={{  mb: 3 }}>Update Working Experience</Typography>

                {
                    updateExperienceData && (
                        <>
                            <Box component='form' onSubmit={handleSubmit}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="technology-select-label">Technology</InputLabel>
                                    <Select
                                        labelId="technology-select-label"
                                        id="technology-select"
                                        name="technologies"
                                        value={updateExperienceData.technologies || []}
                                        onChange={handleChangeUpdateExperienceData}
                                        label="Technology"
                                        multiple
                                    >
                                        {technologiesOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="experience-select-label">Experience</InputLabel>
                                    <Select
                                        labelId="experience-select-label"
                                        id="experience-select"
                                        name="experience"
                                        value={updateExperienceData.experience || ''}
                                        onChange={handleChangeUpdateExperienceData}
                                        label="Experience"
                                    >
                                        {experienceOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="graduation-select-label">Graduation</InputLabel>
                                    <Select
                                        labelId="graduation-select-label"
                                        id="graduation-select"
                                        name="graduation"
                                        value={updateExperienceData.graduation || ''}
                                        onChange={handleChangeUpdateExperienceData}
                                        label="Graduation"
                                    >
                                        {graduationOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="location-select-label">Location</InputLabel>
                                    <Select
                                        labelId="location-select-label"
                                        id="location-select"
                                        name="location"
                                        value={updateExperienceData.location || ''}
                                        onChange={handleChangeUpdateExperienceData}
                                        label="Location"
                                    >
                                        {locationOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="language-select-label">Languages</InputLabel>
                                    <Select
                                        labelId="language-select-label"
                                        id="language-select"
                                        name="languages"
                                        value={updateExperienceData.languages || []}
                                        onChange={handleChangeUpdateExperienceData}
                                        label="Languages"
                                        multiple
                                    >
                                        {languageOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="notice-period-select-label">Notice Period</InputLabel>
                                    <Select
                                        labelId="notice-period-select-label"
                                        id="notice-period-select"
                                        name="noticePeriod"
                                        value={updateExperienceData.noticePeriod || ''}
                                        onChange={handleChangeUpdateExperienceData}
                                        label="Notice Period"
                                    >
                                        {noticePeriodOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Button type="submit" variant="contained" sx={{
                                    width: '30%',
                                    display: 'block',
                                    margin: '0 auto',
                                    textAlign: 'center',
                                    marginTop: '30px'
                                }}
                                >
                                    Submit</Button>
                            </Box>
                        </>
                    )
                }
            </Paper>
        </>
    );
};

export default EditWorkingExperience;
