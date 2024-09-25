import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  userData: {},
  profileImage:{},
  error: null
}

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      }
    },
    loginSuccess: (state, action) => {
      return {
       ...state,
        userData: action.payload.loginDetails,
        error:null
      }
    },  
    setProfileImage: (state, action) => {
      console.log(action.payload)
      return {
       ...state,
        profileImage: action.payload,
        error:null
      }
  },
    logout: (state) => {
      state.userData = {};
      state.error = null;
      localStorage.removeItem('loginToken');
      localStorage.removeItem('employeeId')
      localStorage.removeItem('employerId')
      localStorage.removeItem('passwordToken')
    },
    clearError: (state) => {
      state.error = null;
    },

  },
})

export const {
  setLoading,
  loginSuccess,
  setProfileImage,
  logout,
  clearError
}
  = authSlice.actions

export default authSlice.reducer