import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    experienceData: {},
    allJobPosts: [],
    allUsersAppliedJobPosts:[],
    appliedJobPosts:[],
    error: null
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            return {
                ...state,
                loading: action.payload,
            }
        },
        setAllExperienceData: (state, action) => {
            return {
                ...state,
                experienceData: action.payload,
                error: null
            }
        },
        setExperienceSuccess: (state, action) => {
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
        setAppliedJobPosts: (state, action) => {
            return {
                ...state,
                appliedJobPosts: action.payload,
                error: null
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    setLoading,
    setAllJobPosts,
    setAllUsersAppliedJobPosts,
    setAppliedJobPosts,
    setAllExperienceData,
    setExperienceSuccess,
    setAddJobAppliedPosts,
    clearError
}

    = employeeSlice.actions

export default employeeSlice.reducer