import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    jobPosts: [],
    jobAppliedUsers:[],
    error: null
}

const employerSlice = createSlice({
    name: 'employer',
    initialState,
    reducers: {
        setJobPosts: (state, action) => {
            return {
                ...state,
                jobPosts: action.payload,
                error: null
            }
        },
        addJobPost: (state, action) => {
            return {
                ...state,
                jobPosts: [...state.jobPosts, action.payload],
                error: null
            }
        },
        setUpdateJobPost: (state, action) => {
            const index = state.jobPosts.findIndex((job) => job._id === action.payload._id);
            if (index !== -1) {
                state.jobPosts[index] = action.payload;
            }
            state.error = null;
        },
        setDeleteJobPosts: (state, action) => {
            return {
                ...state,
                jobPosts: state.jobPosts.filter(job => job._id !== action.payload),
                error:null
            }
        },
        setJobAppliedUsers: (state, action) => {
            return {
                ...state,
                jobAppliedUsers: action.payload,
                error: null
            }
        },
        setDeleteAppliedJobPosts: (state, action) => {
            const { jobId, employeeId } = action.payload;
            return {
                ...state,
                jobAppliedUsers: state.jobAppliedUsers.filter(
                    job => !(job.jobId === jobId && job.employee_id === employeeId)
                ),
                error: null
            };
        },
        setApproveAppliedJobPosts: (state, action) => {
            const { jobId, employeeId } = action.payload;
            const job = state.jobAppliedUsers.find(
                job => job.jobId === jobId && job.employee_id === employeeId
            );
            if (job) {
                job.jobStatus = 'Approved';
            }
            state.error = null;
        },
        setRejectAppliedJobPosts: (state, action) => {
            const { jobId, employeeId } = action.payload;
            const job = state.jobAppliedUsers.find(
                job => job.jobId === jobId && job.employee_id === employeeId
            );
            if (job) {
                job.jobStatus = 'Rejected';
            }
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    }
})


export const {
    setJobPosts,
    setJobAppliedUsers,
    setDeleteJobPosts,
    addJobPost,
    setUpdateJobPost,
    setDeleteAppliedJobPosts,
    setApproveAppliedJobPosts,
    setRejectAppliedJobPosts,
    clearError
}

    = employerSlice.actions

export default employerSlice.reducer