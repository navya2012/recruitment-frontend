import axios from 'axios'
import { toast } from 'react-toastify'
import '../CSSModules/formStyles/formPageStyles.css'
import { loginSuccess } from '../redux/slices/authSlice'
import { addJobPost, setDeleteJobPosts, setJobAppliedUsers, setJobPosts, setUpdateJobPost } from '../redux/slices/employerSlice'
import { checkTokenAndProceed } from '../utils/accessToken'


const BASE_URL = "https://recruitment-backend-production.up.railway.app/api"


//update details
export const updateEmployerDetails = (formData, navigate) => async (dispatch) => {
    try {
        const token = checkTokenAndProceed(dispatch,navigate);
        if (!token) return;

        const response = await axios.patch(`${BASE_URL}/employer/update-details`, formData,
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

//create job posts
export const createJobPosts = (newJobPosts, navigate) => async (dispatch) => {
    try {
        const token = checkTokenAndProceed(dispatch,navigate);
        if (!token) return;

        const response = await axios.post(`${BASE_URL}/employer/create-recruitment-posts`, newJobPosts,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response && response.data && response.status === 200) {
            const newJobPost = response.data.newJobPostData
            dispatch(addJobPost(newJobPost))
            navigate('/employer-dashboard/manage-jobs')
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

//update job posts
export const updateJobPostsData = (updateJobPosts, navigate) => async (dispatch) => {
    try {
      const token = checkTokenAndProceed(navigate);
        if (!token) return;

        const response = await axios.patch(`${BASE_URL}/employer/update-recruitment-posts/${updateJobPosts._id}`, updateJobPosts,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response && response.data && response.status === 200) {
            const result = response.data.updatedRecruitmentPosts
            dispatch(setUpdateJobPost(result))
            navigate('/employer-dashboard/manage-jobs')
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

//get job posts
export const getAllJobPostsPostedByEmployer = (navigate) => async (dispatch) => {
    try {
       const token = checkTokenAndProceed(dispatch,navigate);
        if (!token) return;

        const response = await axios.get(`${BASE_URL}/employer/get-recruitment-posts`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        if (response && response.data && response.status === 200) {
            const results = response.data.getJobPostsList
            dispatch(setJobPosts(results))
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

//delete job posts
export const deleteJobPostsData = (jobId, navigate) => async (dispatch) => {
    try {
        const token = checkTokenAndProceed(dispatch,navigate);
        if (!token) return;

        const response = await axios.delete(`${BASE_URL}/employer/delete-recruitment-posts/${jobId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        if (response && response.data && response.status === 200) {
            dispatch(setDeleteJobPosts(jobId))
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

//get all job posts applied by employee posted by employer
export const getAllAppliedJobPostsPostedByEmployer = (navigate) => async (dispatch) => {
    try {
        const token = checkTokenAndProceed(dispatch,navigate);
        if (!token) return;

        const response = await axios.get(`${BASE_URL}/employer/get-job-applied-posts`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if (response && response.data && response.status === 200) {
            const result = response?.data?.jobAppliedPostsList
            dispatch(setJobAppliedUsers(result))
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

