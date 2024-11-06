import axios from 'axios'
import { toast } from 'react-toastify'
import '../CSSModules/formStyles/formPageStyles.css'
import { loginSuccess } from '../redux/slices/authSlice'
import { setAddJobAppliedPosts, setAllJobPosts, setAllUsersAppliedJobPosts, setAllAppliedJobs, setEmployeeFullDetails, setAddExperience, setUpdateExperience, setExperienceData } from '../redux/slices/employeeSlice'
import { checkTokenAndProceed } from '../utils/accessToken'


//employee full details
export const getEmployeeFullDetails = (employeeId) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_CANDIDATE_URL}/employee-full-details/${employeeId}`)
        if (response && response.data && response.status === 200) {
            const result = response.data.fullDetails
            dispatch(setEmployeeFullDetails(result))
            // toast.success(response.data.message, {
            //     position: "top-center",
            //     autoClose: 3000,
            //     className: 'custom-toast'
            // });
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        const errors = error.response.data.error
        toast.error(errors, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errors
        };
    }
}

//update details
export const updateEmployeeDetails = (formData, navigate) => async (dispatch) => {
    try {
        const token = checkTokenAndProceed(dispatch,navigate);
        if (!token) return; 

        const response = await axios.patch(`${process.env.REACT_APP_BASE_CANDIDATE_URL}/update-details`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response && response.data && response.status === 200) {
            const { updatedUser } = response.data
            if (formData.role === 'employee') {
                dispatch(loginSuccess({ loginDetails: updatedUser }));
                navigate('/candidate-dashboard/employee-profile-details')
            } else if (formData.role === 'employer') {
                dispatch(loginSuccess({ loginDetails: updatedUser }));
                navigate('/employer-dashboard/employer-profile-details')
            }
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast'
            });
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        let errorMessages = [];
        if (error.response && error.response.data && error.response.data.error) {
            if (Array.isArray(error.response.data.error)) {
                errorMessages = error.response.data.error.map(err => err.msg);
            } else if (typeof error.response.data.error === 'string') {
                errorMessages = [error.response.data.error];
            } else {
                errorMessages = ['An unknown error occurred'];
            }
        } else {
            // Handle cases where error.response is undefined
            errorMessages = ['A network error occurred. Please try again later.'];
        }
        errorMessages && errorMessages.forEach(message => {
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                className: 'custom-toast'
            });
        });
        return {
            success: false,
            errors: errorMessages
        };
    }
}

// working experience
export const getWorkingExperienceData = (navigate) => async (dispatch) => {
    try {
        const token = checkTokenAndProceed(dispatch,navigate);
        if (!token) return; 

        const response = await axios.get(`${process.env.REACT_APP_BASE_CANDIDATE_URL}/get-working-experience`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response && response.data && response.status === 200) {
            dispatch(setExperienceData(response.data.experienceData))
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        let errorMessage = '';
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
        } else if (error.message) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }
        toast.error(errorMessage, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errorMessage
        };
    }
}

//add working experience
export const addWorkingExperience = (experienceData, navigate) => async (dispatch) => {
    try {
        const token = checkTokenAndProceed(dispatch,navigate);
        if (!token) return; 
        
        const employeeId = JSON.parse(localStorage.getItem('employeeId'));
        const data = { ...experienceData, employee_id: employeeId };
        const response = await axios.post(`${process.env.REACT_APP_BASE_CANDIDATE_URL}/add-working-experience`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response && response.data && response.status === 200) {
            dispatch(setAddExperience(response?.data?.addWorkingExperience))
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        const errors = error.response.data.error
        toast.error(errors, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errors
        };
    }
}

//update working experience
export const updateWorkingExperience = (experienceData, navigate) => async (dispatch) => {
    try {
        const token = checkTokenAndProceed(dispatch,navigate);
        if (!token) return; 
        
        const response = await axios.patch(`${process.env.REACT_APP_BASE_CANDIDATE_URL}/update-working-experience`, experienceData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response && response.data && response.status === 200) {
            dispatch(setUpdateExperience(response.data.updatedWorkingExperience))
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        const errors = error.response.data.error
        toast.error(errors, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errors
        };
    }
}

//get job posts
export const getAllJobPostsData = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_CANDIDATE_URL}/get-all-recruitment-posts`)
        if (response && response.data && response.status === 200) {
            const allJobPosts = response.data.getAllJobPostsData
            dispatch(setAllJobPosts(allJobPosts))
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        let errorMessage = '';
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
        } else if (error.message) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }
        toast.error(errorMessage, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errorMessage
        };
    }
}


//post job applied status
export const JobAppliedPostsStatus = (jobId, navigate) => async (dispatch) => {
    try {
        const token = checkTokenAndProceed(dispatch,navigate);
        if (!token) return;
        
        const response = await axios.post(`${process.env.REACT_APP_BASE_CANDIDATE_URL}/update-job-applied-status/${jobId}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        if (response && response.data && response.status === 200) {
            dispatch(setAddJobAppliedPosts(response.data.jobApplication))
            dispatch(getAllJobPostsAppliedByAllEmployees())
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast'
            });
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        let errorMessage = '';
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
        } else if (error.message) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }
        toast.error(errorMessage, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errorMessage
        };
    }
}

//all job post applied status by employees
export const getAllJobPostsAppliedByAllEmployees = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_CANDIDATE_URL}/get-all-applied-job-posts`)
        if (response && response.data && response.status === 200) {
            const allUsersAppliedJobs = response.data.getAllJobAppliedPostsData
            dispatch(setAllUsersAppliedJobPosts(allUsersAppliedJobs));
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast'
            });
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        let errorMessage = '';
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
        } else if (error.message) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }
        toast.error(errorMessage, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errorMessage
        };
    }
}

//get all job posts applied by employee posted by employer
export const getAllAppliedJobsByEmployee = (navigate) => async (dispatch) => {
    try {
        const token = checkTokenAndProceed(dispatch,navigate);
        if (!token) return;

        const response = await axios.get(`${process.env.REACT_APP_BASE_CANDIDATE_URL}/get-applied-jobs`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        if (response && response.data && response.status === 200) {
            const appliedJobs = response.data.jobsAppliedList
            dispatch(setAllAppliedJobs(appliedJobs))

            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast'
            });
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        const errors = error.response.data.error
        toast.error(errors, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errors
        };
    }
}