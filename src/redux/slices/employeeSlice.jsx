import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    employeeFullDetails:{},
    experienceData: {},
    allJobPosts: [],
    allUsersAppliedJobPosts:[],
    allAppliedJobs:[],
    error: null
}

    
const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployeeFullDetails: (state, action) => {
            return {
                ...state,
                employeeFullDetails: action.payload,
                error: null
            }
        },
        setExperienceData: (state, action) => {
            return {
                ...state,
                experienceData: action.payload,
                error: null
            }
        },
        setAddExperience: (state, action) => {
            return {
                ...state,
                experienceData: action.payload,
                error: null
            }
        },
        setUpdateExperience: (state, action) => {
            return {
                ...state,
                experienceData: action.payload,
                error: null
            }
        },
        setAllJobPosts: (state, action) => {
            return {
                ...state,
                allJobPosts: action.payload,
                error: null
            }
        },
        setAddJobAppliedPosts: (state, action) => {
            return {
                ...state,
                allUsersAppliedJobPosts: [...state.allUsersAppliedJobPosts, action.payload],
                error: null,
            };
        },        
        setAllUsersAppliedJobPosts: (state, action) => {
            return {
                ...state,
                allUsersAppliedJobPosts: action.payload,
                error: null
            }
        },
        setAllAppliedJobs: (state, action) => {
            return {
                ...state,
                allAppliedJobs: action.payload,
                error: null
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    setExperienceData,
    setUpdateExperience,
    setAddExperience,
    setEmployeeFullDetails,
    setAllJobPosts,
    setAllUsersAppliedJobPosts,
    setAllAppliedJobs,
    setAllExperienceData,
    setExperienceSuccess,
    setAddJobAppliedPosts,
    clearError
}

    = employeeSlice.actions

export default employeeSlice.reducer